import dotenv from 'dotenv'
dotenv.config()
import { Scenes, session, Telegraf } from 'telegraf'
import fastify from 'fastify'
import fastifyAutoload from 'fastify-autoload'
import telegrafPlugin from 'fastify-telegraf'
import path from 'path/posix'
import pino from 'pino'
import botPlugin from './plugins/bot-plugin'
import { superWizard, superWizardId } from './wizards/super-wizard'
import corsRouterPlugin from './plugins/cors-router-plugin'

const BOT_TOKEN = process.env.BOT_TOKEN
const DATABASE_URL = process.env.DATABASE_URL
const WEBHOOK_URL =
  process.env.WEBHOOK_URL ??
  `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
const PORT = process.env.PORT ?? 3000

if (!BOT_TOKEN) throw new Error('BOT_TOKEN must be provided!')
if (!DATABASE_URL) throw new Error('DATABASE_URL must be provided!')
if (!WEBHOOK_URL) throw new Error('WEBHOOK_URL must be provided!')

const bot = new Telegraf<Scenes.WizardContext>(BOT_TOKEN)
const app = fastify({
  logger: pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
})

const SECRET_PATH = `/telegraf/${bot.secretPathComponent()}`
app.register(telegrafPlugin, { bot, path: SECRET_PATH })
app.register(botPlugin, { bot: bot })
app.register(corsRouterPlugin)
const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
  default: superWizardId,
})
bot.use(session())
bot.use(stage.middleware())

bot.telegram.setWebhook(WEBHOOK_URL + SECRET_PATH).then(() => {
  console.log('Webhook is set on', WEBHOOK_URL)
})

app.listen(PORT, '0.0.0.0').then(() => {
  console.log('Listening on port', PORT)
})

process.once('SIGINT', () => app.close())
process.once('SIGTERM', () => app.close())
