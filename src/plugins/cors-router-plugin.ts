import { FastifyPluginAsync } from 'fastify'
import fastifyAutoload from 'fastify-autoload'
import fastifyCors from 'fastify-cors'
import path from 'path'

const corsRouterPlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(fastifyCors, {
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
  fastify.register(fastifyAutoload, {
    dir: path.resolve(__dirname, '..', 'routers'),
  })
}

export default corsRouterPlugin
