import { Catalogue, PictureLinks, Product } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import productInlineKeyboardMaker from '../keyboards/product-inline-keyboard-maker'
import { ICatalogueDto, IProductDto } from '../models/Product'

export default class MessageMaker {
  private fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  async make(
    data: Product & {
      catalogue: Catalogue
      pictureLinks: PictureLinks[]
    }
  ) {
    const message = await this.fastify.telegramBot.telegram.sendPhoto(
      `@${data.catalogue.url}`,
      data.pictureLinks[0].url,
      {
        caption: `${data.name}\n\n${data.description}`,
        reply_markup: productInlineKeyboardMaker.make(data).reply_markup,
      }
    )

    return message
  }
}
