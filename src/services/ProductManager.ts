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

  public async getProduct(id: string) {
    const product = await Database.instance.client.product.findUnique({
      where: { id: parseInt(id) },
    })
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
    const updateResult = await Database.instance.client.$transaction(
      async (prisma) => {
        if (!product.id) throw new Error('product id is undefined')

        const updatedProduct = await prisma.product.update({
          data: {
            name: product.name,
            description: product.description,
            catalogueId: parseInt(product.catalogueId),
          },
          where: { id: parseInt(product.id) },
          include: { catalogue: true, pictureLinks: true },
        })

        if (updatedProduct.messageId) {
          await this.fastify.telegramBot.telegram.deleteMessage(
            `@${updatedProduct.catalogue.url}`,
            updatedProduct.messageId
          )

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
  }
}
