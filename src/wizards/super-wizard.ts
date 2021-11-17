import { Scenes, Composer } from 'telegraf'
import mainKeyboardMaker from '../keyboards/main-keyboard-maker'
import Database from '../models/db'

export const superWizardId = 'super-wizard'

const composer = new Composer()

composer.start(async (ctx) => {
  try {
    await ctx
    const catalogues = await Database.instance.client.catalogue.findMany()
    await ctx.replyWithMarkdownV2(
      'Вас приветствует телеграм бот от *Lucky Buyer*\\. Что вас интересует?',
      mainKeyboardMaker.make(catalogues)
    )
  } catch (err) {
    console.log(err)
    ctx.reply('Произошла ошибка.')
  }
})

export const superWizard = new Scenes.WizardScene<Scenes.WizardContext>(
  superWizardId,
  composer
)
