import { FastifyPluginAsync } from 'fastify'
import fastifyCors from 'fastify-cors'
import Link from '../helpers/Link'
import LinkKeeper from '../helpers/LinkKeeper'

interface IPutSupportContactBody {
  supportDisplay: string
  supportUrl: string
}

interface IPatchSupportContactBody {
  supportDisplay?: string
  supportUrl?: string
}

const controlRouter: FastifyPluginAsync = async (fastify, opts) => {
  fastify.put<{ Body: IPutSupportContactBody }>(
    '/support',
    async (req, res) => {
      const { supportDisplay, supportUrl } = req.body

      LinkKeeper.instance.supportLink = new Link(supportDisplay, supportUrl)

      return LinkKeeper.instance.supportLink
    }
  )

  fastify.patch<{ Body: IPatchSupportContactBody }>(
    '/support',
    async (req, res) => {
      const { supportDisplay, supportUrl } = req.body
      const supportLink = LinkKeeper.instance.supportLink
      LinkKeeper.instance.setSupportLinkRaw(
        supportDisplay ?? supportLink.name,
        supportUrl ?? supportLink.url
      )

      return LinkKeeper.instance.supportLink
    }
  )

  fastify.get('/support', async (req, res) => {
    fastify.log.warn('redirecting?')
    await res.redirect(LinkKeeper.instance.supportLink.url)
    return
  })

  fastify.get('/info', async (req, res) => {
    return {
      supportTelegram: LinkKeeper.instance.supportLink.telegram,
    }
  })
}

export default controlRouter

export const autoPrefix = '/control'
