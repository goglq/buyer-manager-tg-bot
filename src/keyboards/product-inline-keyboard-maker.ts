import { Markup } from 'telegraf'
import { IProductMessageDto } from '../dtos/Product'

class ProductInlineKeyboardMaker {
  make(data: IProductMessageDto) {
    const keyboard = Markup.inlineKeyboard([
      [
        Markup.button.url(
          'Купить оптом',
          `${process.env.WEBHOOK_URL}/control/support`
        ),
        Markup.button.url('Купить в розницу', 'https://t.me/purpaLambo192'),
      ],
      [
        Markup.button.url(
          'Больше фото',
          `https://t.me/buyermanager_bot?start=detail_${data.id}`
        ),
      ],
    ])

    return keyboard
  }
}

export default new ProductInlineKeyboardMaker()
