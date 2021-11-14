import { Composer, Markup } from 'telegraf'
import MyContext from '../../context'

const confirmationHandler = new Composer<MyContext>()

const photoDoneKeyboard = Markup.keyboard(['Done'])

confirmationHandler.hears('Exit', (ctx) => {
  ctx.deleteMessage(ctx.scene.session.messageId)
  ctx.reply('Отмена добавления канала')
  return ctx.scene.leave()
})

confirmationHandler.action('confirm', async (ctx) => {
  await ctx.reply('Отправьте фотографии товара.', photoDoneKeyboard)
  return ctx.wizard.next()
})

confirmationHandler.action('cancel', (ctx) => {
  ctx.deleteMessage()
  ctx.reply('Добавление канала отменено', Markup.removeKeyboard())
  return ctx.scene.leave()
})

export default confirmationHandler
