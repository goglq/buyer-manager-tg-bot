import { Scenes, Markup, Telegraf } from 'telegraf'
import MyContext from '../context'
import inputChannelHandler from '../composers/channel/inputChannelHandler'
import confirmationHandler from '../composers/channel/confirmationHandler'

export const wizardId = 'add-channel-wizard'

const exitKeyboard = Markup.keyboard(['Exit']).oneTime()

const addChannelWizard = new Scenes.WizardScene<MyContext>(
  wizardId,
  async (ctx) => {
    await ctx.reply(
      'Введите адрес вашего канала с приставкой @. Например, @myChannel.',
      exitKeyboard
    )
    return ctx.wizard.next()
  },
  inputChannelHandler,
  confirmationHandler
)

export default addChannelWizard
