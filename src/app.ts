import dotenv from 'dotenv'
dotenv.config()
import { Scenes, session, Telegraf } from 'telegraf'
import fastify from 'fastify'
import fastifyAutoload from 'fastify-autoload'
import fastifyCors from 'fastify-cors'
import telegrafPlugin from 'fastify-telegraf'
import path from 'path/posix'
import pino from 'pino'
import botPlugin from './plugins/bot-plugin'
import { superWizard, superWizardId } from './wizards/super-wizard'

const BOT_TOKEN = process.env.BOT_TOKEN
const DATABASE_URL = process.env.DATABASE_URL
const WEBHOOK_URL = process.env.WEBHOOK_URL
const PORT = process.env.PORT

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN must be provided!')
}
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL must be provided!')
}
if (!WEBHOOK_URL) {
  throw new Error('WEBHOOK_URL must be provided!')
}

declare module 'fastify' {
  export interface FastifyInstance {
    telegramBot: Telegraf<Scenes.WizardContext>
  }
}

const bot = new Telegraf<Scenes.WizardContext>(BOT_TOKEN)

const app = fastify({
  logger: pino({
    prettyPrint: true,
  }),
})

const SECRET_PATH = `/telegraf/${bot.secretPathComponent()}`
app.register(fastifyCors, {
  origin: (origin, cb) => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.ALLOWED_ORIGIN === origin
    ) {
      cb(null, true)
      return
    }
    cb(new Error('Not Allowed'), false)
  },
})
app.register(telegrafPlugin, { bot, path: SECRET_PATH })
app.register(botPlugin, { bot: bot })
app.register(fastifyAutoload, { dir: path.join(__dirname, 'routers') })

const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
  default: superWizardId,
})

bot.use(session())
bot.use(stage.middleware())

bot.telegram.setWebhook(WEBHOOK_URL + SECRET_PATH).then(() => {
  console.log('Webhook is set on', WEBHOOK_URL)
})

app.listen(PORT || 3000).then(() => {
  console.log('Listening on port', PORT)
})

process.once('SIGINT', () => app.close())
process.once('SIGTERM', () => app.close())
