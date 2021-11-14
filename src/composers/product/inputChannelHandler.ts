import { Composer, Markup } from 'telegraf'
import MyContext from '../../context'

const addProductHandler = new Composer<MyContext>()

const confirmationInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Yes', 'confirm'),
  Markup.button.callback('No', 'cancel'),
])

addProductHandler.hears('Exit', (ctx) => {
  ctx.reply('Отмена добавления товара')
  return ctx.scene.leave()
})

addProductHandler.hears(/^@.+$/, async (ctx) => {
  try {
    ctx.scene.session.channelAddress = ctx.message.text
    const message = await ctx.reply(
      `Вы хотите добавить товар в ${ctx.scene.session.channelAddress}?`,
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

addProductHandler.use((ctx) => {
  ctx.replyWithMarkdown('Введите адрес канала.')
})

export default addProductHandler
