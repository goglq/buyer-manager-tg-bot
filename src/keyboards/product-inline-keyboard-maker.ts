import { Markup } from 'telegraf'
import { IProductMessageDto } from '../dtos/ProductDto'
import LinkKeeper from '../helpers/LinkKeeper'

class ProductInlineKeyboardMaker {
  make(data: IProductMessageDto) {
    const keyboard = Markup.inlineKeyboard([
      [
        Markup.button.url('Купить оптом', LinkKeeper.instance.supportLink.url),
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
