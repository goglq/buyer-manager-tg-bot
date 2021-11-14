import { Composer, Markup } from 'telegraf'
import MyContext from '../../context'

const uploadPicturesHandler = new Composer<MyContext>()

uploadPicturesHandler.on('photo', (ctx) => {
  ctx.scene.session.photoIds = ctx.scene.session.photoIds ?? []
  ctx.scene.session.photoIds.push(ctx.message.photo[0].file_id)
})

uploadPicturesHandler.hears('Done', async (ctx) => {
  await ctx.reply('Фотографии получены.', Markup.removeKeyboard())
  ctx.scene.session.photoIds.forEach((photoId) => ctx.replyWithPhoto(photoId))

  //ctx.telegram.sendPhoto()

  return ctx.wizard.next()
})

export default uploadPicturesHandler
