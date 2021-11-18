import { Scenes, Composer } from 'telegraf'
import { detailComposer } from '../composers/detail-composer'
import mainKeyboardMaker from '../keyboards/main-keyboard-maker'
import Database from '../models/db'

export const superWizardId = 'super-wizard'

const composer = new Composer<Scenes.WizardContext>()

interface MediaGroup {
  type: 'photo'
  media: {
    url: string
  }
  caption?: string
}

async function sendProductMedia(ctx: Scenes.WizardContext, productId: string) {
  const product = await Database.instance.client.product.findUnique({
    where: { id: parseInt(productId) },
    include: { pictureLinks: true },
  })

  if (!product) {
    return ctx.reply('Товар не был найден.')
  }

  const media: MediaGroup[] = product.pictureLinks.map((pictureLink) => ({
    type: 'photo',
    media: {
      url: pictureLink.url,
    },
  }))
  media[0].caption = `${product.name}\n\n${product.description}`
  ctx.replyWithMediaGroup(media)
}

async function sendInfo(ctx: Scenes.WizardContext) {
  const catalogues = await Database.instance.client.catalogue.findMany()
  await ctx.replyWithMarkdownV2(
    'Вас приветствует телеграм бот от *Lucky Buyer*\\. Что вас интересует?',
    mainKeyboardMaker.make(catalogues)
  )
}

composer.start(async (ctx) => {
  if (/detail/.test(ctx.startPayload)) {
    const productId = ctx.startPayload.split('_')[1]
    return await sendProductMedia(ctx, productId)
  }

  try {
    await sendInfo(ctx)
  } catch (err) {
    console.log(err)
    ctx.reply('Произошла ошибка.')
  }
})

composer.use(async (ctx) => {
  await sendInfo(ctx)
})

export const superWizard = new Scenes.WizardScene<Scenes.WizardContext>(
  superWizardId,
  composer,
  detailComposer
)
