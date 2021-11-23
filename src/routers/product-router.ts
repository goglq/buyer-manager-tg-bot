import { FastifyPluginAsync } from 'fastify'
import fastifyCors from 'fastify-cors'
import { Markup } from 'telegraf'
import { Message } from 'telegraf/typings/core/types/typegram'
import LinkKeeper from '../helpers/LinkKeeper'
import Database from '../models/db'
import ProductManager from '../services/ProductManager'

interface IGetProductParams {
  id: string
}

interface ICreateProductBody {
  name: string
  description: string
  catalogueId: string
  photoUrls: string[]
}

interface IGetProductQuerystring {
  catalogueId?: string
  includePictures?: boolean
}

const productRouter: FastifyPluginAsync = async (fastify, opt) => {
  const productManager = new ProductManager(fastify)

  fastify.get<{ Querystring: IGetProductQuerystring }>(
    '/',
    async (req, res) => {
      const { catalogueId } = req.query
      const products = await productManager.getProducts(catalogueId)
      return products
    }
  )

  fastify.get<{
    Querystring: IGetProductQuerystring
    Params: IGetProductParams
  }>('/:id', async (req, res) => {
    const { id } = req.params
    const { includePictures } = req.query
    const product = await productManager.getProduct(id, includePictures)
    return product
  })

  fastify.post<{ Body: ICreateProductBody }>('/', async (req, res) => {
    const { name, description, catalogueId, photoUrls } = req.body
    const createdProduct = await productManager.postProduct({
      name,
      description,
      catalogueId,
      photoUrls,
    })
    return createdProduct
  })

  fastify.put<{ Params: IGetProductParams; Body: ICreateProductBody }>(
    '/:id',
    async (req, res) => {
      const { id } = req.params
      const { name, description, catalogueId, photoUrls } = req.body

      const updateResult = await productManager.putProduct({
        id,
        name,
        description,
        catalogueId,
        photoUrls,
      })

      return updateResult
    }
  )

  fastify.patch<{ Params: IGetProductParams; Body: ICreateProductBody }>(
    ':id',
    async (req, res) => {
      const { id } = req.params
      const { name, description, catalogueId, photoUrls } = req.body

      const patchResult = await Database.instance.client.$transaction(
        async (prisma) => {
          const patchedProduct = await prisma.product.update({
            data: {
              name: name,
              description: description,
              catalogueId: parseInt(catalogueId),
            },
            where: {
              id: parseInt(id),
            },
            include: {
              catalogue: true,
              pictureLinks: true,
            },
          })

          if (name || description) {
            await fastify.telegramBot.telegram.editMessageCaption(
              `@${patchedProduct.catalogue.url}`,
              <number | undefined>patchedProduct.messageId,
              undefined,
              `${patchedProduct.name}\n\n${patchedProduct.description}`
            )
          }

          if (catalogueId && patchedProduct.messageId) {
            await fastify.telegramBot.telegram.deleteMessage(
              `@${patchedProduct.catalogue.url}`,
              patchedProduct.messageId
            )

            const updatedMessage = await fastify.telegramBot.telegram.sendPhoto(
              `@${patchedProduct.catalogue.url}`,
              patchedProduct.pictureLinks[0].url,
              {
                caption: `${patchedProduct.name}\n\n${patchedProduct.description}`,
                reply_markup: Markup.inlineKeyboard([
                  [
                    Markup.button.url(
                      'Купить оптом',
                      LinkKeeper.instance.supportLink.url
                    ),
                    Markup.button.url(
                      'Купить в розницу',
                      'https://t.me/purpaLambo192'
                    ),
                  ],
                  [
                    Markup.button.url(
                      'Больше фото',
                      `https://t.me/buyermanager_bot?start=detail_${patchedProduct.id}`
                    ),
                  ],
                ]).reply_markup,
              }
            )
          }

          return patchedProduct
        }
      )

      return patchResult
    }
  )

  fastify.delete<{ Params: IGetProductParams }>('/:id', async (req, res) => {
    const { id } = req.params
    const deleted = await productManager.deleteProduct(id)
    return deleted
  })
}

export default productRouter

export const autoPrefix = '/product'
