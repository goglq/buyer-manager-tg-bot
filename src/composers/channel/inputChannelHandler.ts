import { Composer, Markup } from 'telegraf'
import MyContext from '../../context'

const addChannelHandler = new Composer<MyContext>()

const confirmationInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Yes', 'addChannel'),
  Markup.button.callback('No', 'cancel'),
])

addChannelHandler.hears('Exit', (ctx) => {
  ctx.deleteMessage()
  ctx.reply('Отмена добавления канала')
  return ctx.scene.leave()
})

addChannelHandler.hears(/^@.+$/, async (ctx) => {
  try {
    ctx.scene.session.channelAddress = ctx.message.text
    const message = await ctx.reply(
      `Вы хотите добавить ${ctx.scene.session.channelAddress}?`,
      confirmationInlineKeyboard
    )
    ctx.scene.session.messageId = message.message_id
    return ctx.wizard.next()
  } catch (error) {
    console.log(error)
    await ctx.reply('Непредвиденная ошибка')
    await ctx.scene.leave()
  }
})

addChannelHandler.use((ctx) => {
  ctx.replyWithMarkdown('Введите адрес канала.')
})

export default addChannelHandler
