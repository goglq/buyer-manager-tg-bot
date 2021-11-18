import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { Scenes, Telegraf } from 'telegraf'

declare module 'fastify' {
  export interface FastifyInstance {
    telegramBot: Telegraf<Scenes.WizardContext>
  }
}

const botPlugin: FastifyPluginAsync<{ bot: Telegraf<Scenes.WizardContext> }> =
  async (fastify, opts) => {
    fastify.decorate('telegramBot', opts.bot)
  }

export default fp(botPlugin)
