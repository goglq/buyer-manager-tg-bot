import { FastifyInstance } from 'fastify'
import { Message } from 'telegraf/typings/core/types/typegram'
import MessageMaker from '../helpers/MessageMaker'
import Database from '../models/db'
import { IProductDto } from '../dtos/ProductDto'

export default class ProductManager {
  private fastify: FastifyInstance
  private messageMaker: MessageMaker

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
    this.messageMaker = new MessageMaker(fastify)
  }

  public async getProducts(catalogueId?: string) {
    let products
    if (catalogueId) {
      products = await Database.instance.client.product.findMany({
        where: { catalogueId: parseInt(catalogueId) },
      })
    } else {
      products = await Database.instance.client.product.findMany()
    }
    return products
  }

  public async getProduct(id: string, includePictures?: boolean) {
    let product
    if (includePictures === undefined || includePictures == false) {
      product = await Database.instance.client.product.findUnique({
        where: { id: parseInt(id) },
      })
    } else {
      product = await Database.instance.client.product.findUnique({
        where: { id: parseInt(id) },
        include: { pictureLinks: includePictures },
      })
    }
    return product
  }

  public async postProduct(product: IProductDto) {
    let message: Message.PhotoMessage = {
      message_id: -1,
      date: 0,
      chat: {
        id: 0,
        title: '',
        type: 'channel',
      },
      photo: [],
    }
    try {
      const result = await Database.instance.client.$transaction(
        async (prisma) => {
          const newProduct = await prisma.product.create({
            data: {
              name: product.name,
              description: product.description,
              catalogueId: parseInt(product.catalogueId),
            },
            include: {
              catalogue: true,
              pictureLinks: true,
            },
          })

          this.fastify.log.info(newProduct)

          const newPictures = await prisma.pictureLinks.createMany({
            data: product.photoUrls.map((photoUrl) => ({
              url: photoUrl,
              productId: newProduct.id,
            })),
          })

          this.fastify.log.info(newPictures)

          message = await this.messageMaker.make({
            id: newProduct.id,
            name: newProduct.name,
            description: newProduct.description,
            catalogueUrl: newProduct.catalogue.url,
            pictureUrls: product.photoUrls,
          })

          this.fastify.log.info(message)

          await prisma.product.update({
            data: { messageId: message.message_id },
            where: { id: newProduct.id },
          })

          newProduct.messageId = message.message_id

          this.fastify.log.info(newProduct)

          return { newProduct, newPictures }
        }
      )
      this.fastify.log.warn('result done')

      return result
    } catch (err) {
      if (message.message_id !== -1) {
        this.fastify.telegramBot.telegram.deleteMessage(
          message.chat.id,
          message.message_id
        )
      }
      this.fastify.log.error(err)
      throw err
    }
  }

  public async putProduct(product: IProductDto) {
    try {
      const updateResult = await Database.instance.client.$transaction(
        async (prisma) => {
          if (!product.id) throw new Error('product id is undefined')

          const urls = product.photoUrls.map((url) => ({ url: url }))

          const updatedProduct = await prisma.product.update({
            data: {
              name: product.name,
              description: product.description,
              catalogueId: parseInt(product.catalogueId),
              pictureLinks: {
                deleteMany: {
                  productId: parseInt(product.id),
                },
                createMany: {
                  data: urls,
                },
              },
            },
            where: { id: parseInt(product.id) },
            include: { catalogue: true, pictureLinks: true },
          })

          if (updatedProduct.messageId) {
            try {
              await this.fastify.telegramBot.telegram.deleteMessage(
                `@${updatedProduct.catalogue.url}`,
                updatedProduct.messageId
              )
            } catch (error) {
              this.fastify.log.warn(error)
            }

            const updatedMessage = await this.messageMaker.make({
              id: updatedProduct.id,
              name: updatedProduct.name,
              description: updatedProduct.description,
              catalogueUrl: updatedProduct.catalogue.url,
              pictureUrls: updatedProduct.pictureLinks.map(
                (pictureLink) => pictureLink.url
              ),
            })

            await prisma.product.update({
              data: { messageId: updatedMessage.message_id },
              where: { id: updatedProduct.id },
            })
          }

          return updatedProduct
        }
      )
      return updateResult
    } catch (error) {
      this.fastify.log.error(error)
    }
  }

  public async deleteProduct(id: string) {
    const deleted = await Database.instance.client.$transaction(
      async (prisma) => {
        const deleted = await prisma.product.delete({
          where: { id: parseInt(id) },
          include: {
            catalogue: true,
          },
        })

        try {
          if (deleted.messageId) {
            await this.fastify.telegramBot.telegram.deleteMessage(
              `@${deleted.catalogue.url}`,
              deleted!.messageId
            )
          }
        } catch (error) {
          this.fastify.log.warn(error)
        }
        return deleted
      }
    )
    return deleted
  }
}
