import dotenv from 'dotenv'
dotenv.config()

import { Scenes, session, Telegraf } from 'telegraf'
import AddChannelCommand from './commands/AddChannelCommand'
import AddProductCommand from './commands/AddProductCommand'
import MyContext from './context'
import addChannelWizard from './wizards/addChannelWizard'
import addProductWizard from './wizards/addProductWizard'

const BOT_TOKEN = process.env.BOT_TOKEN
const DATABASE_URL = process.env.DATABASE_URL

if (BOT_TOKEN === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}
if (DATABASE_URL === undefined) {
  throw new Error('DATABASE_URL must be provided!')
}

const bot = new Telegraf<MyContext>(BOT_TOKEN)

const stage = new Scenes.Stage<MyContext>([addChannelWizard, addProductWizard])

bot.use(session())
bot.use(stage.middleware())

bot.command(AddChannelCommand.name, AddChannelCommand.execute)
bot.command(AddProductCommand.name, AddProductCommand.execute)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
