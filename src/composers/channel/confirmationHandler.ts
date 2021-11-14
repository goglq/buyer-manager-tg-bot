import { Composer, Markup } from 'telegraf'
import MyContext from '../../context'

const confirmationHandler = new Composer<MyContext>()

confirmationHandler.hears('Exit', (ctx) => {
  ctx.deleteMessage(ctx.scene.session.messageId)
  ctx.reply('Отмена добавления канала')
  return ctx.scene.leave()
})

confirmationHandler.action('addChannel', (ctx) => {
  ctx.deleteMessage()
  ctx.reply('Ваш канал добавлен', Markup.removeKeyboard())
  return ctx.scene.leave()
})

confirmationHandler.action('cancel', (ctx) => {
  ctx.deleteMessage()
  ctx.reply('Добавление канала отменено', Markup.removeKeyboard())
  return ctx.scene.leave()
})

export default confirmationHandler
