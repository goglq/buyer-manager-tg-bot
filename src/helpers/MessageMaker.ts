import { FastifyInstance } from 'fastify'
import productInlineKeyboardMaker from '../keyboards/product-inline-keyboard-maker'
import { IProductMessageDto as IProductMessageDto } from '../dtos/Product'

export default class MessageMaker {
  private fastify: FastifyInstance

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify
  }

  async make(data: IProductMessageDto) {
    this.fastify.log.warn(data)
    const message = await this.fastify.telegramBot.telegram.sendPhoto(
      `@${data.catalogueUrl}`,
      data.pictureUrls[0],
      {
        caption: `${data.name}\n\n${data.description}`,
        reply_markup: productInlineKeyboardMaker.make(data).reply_markup,
      }
    )

    return message
  }
}
