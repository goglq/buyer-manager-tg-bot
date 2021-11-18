import { Composer, Scenes } from 'telegraf'

export const detailComposer = new Composer<Scenes.WizardContext>()

detailComposer.use(async (ctx) => {
  return ctx.wizard.back()
})
