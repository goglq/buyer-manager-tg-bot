import { Markup, Scenes } from 'telegraf'
import MyContext from '../context'
import inputChannelHandler from '../composers/product/inputChannelHandler'
import confirmationHandler from '../composers/product/confirmationHandler'
import uploadPicturesHandler from '../composers/product/uploadPicturesHandler'

export const wizardId = 'add-product-wizard'

const exitKeyboard = Markup.keyboard(['Exit']).oneTime()

const addProductWizard = new Scenes.WizardScene<MyContext>(
  wizardId,
  async (ctx) => {
    await ctx.reply(
      'Введите название канала куда вы хотите добавить товар.',
      exitKeyboard
    )
    return ctx.wizard.next()
  },
  inputChannelHandler,
  confirmationHandler,
  uploadPicturesHandler
)

export default addProductWizard
