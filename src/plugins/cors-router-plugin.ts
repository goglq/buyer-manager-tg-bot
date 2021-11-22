import { FastifyPluginAsync } from 'fastify'
import fastifyAutoload from 'fastify-autoload'
import fastifyCors from 'fastify-cors'
import path from 'path'

const corsRouterPlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(fastifyCors, {
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
  fastify.register(fastifyAutoload, {
    dir: path.resolve(__dirname, '..', 'routers'),
  })
}

export default corsRouterPlugin
