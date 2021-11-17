import { Catalogue } from '@prisma/client'
import { Markup } from 'telegraf'
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram'
import LinkKeeper from '../helpers/LinkKeeper'

class MainInlineKeyboardMaker {
  private makeButton(name: string, url: string) {
    return Markup.button.url(name, url)
  }

  public make(data: Catalogue[]) {
    const catalogueButtons = data.map((catalogue) =>
      this.makeButton(catalogue.name, catalogue.url)
    )

    const buttons: InlineKeyboardButton[][] = []

    catalogueButtons.forEach((catalogueButton) =>
      buttons.push([catalogueButton])
    )

    buttons.push([
      this.makeButton(
        LinkKeeper.instance.supportLink.name,
        LinkKeeper.instance.supportLink.url
      ),
    ])

    return Markup.inlineKeyboard(buttons)
  }
}

export default new MainInlineKeyboardMaker()
