import Fastify from 'fastify'
import cors from '@fastify/cors'
import { loggerConfig } from './config/logger.js'
import { errorHandler } from './plugins/errorHandler.js'

const fastify = Fastify({
  logger: loggerConfig,
})

await fastify.register(cors, {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : true,
  credentials: true,
})

await fastify.register(errorHandler)

fastify.get('/health', async () => {
  return { status: 'ok' }
})

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000
    await fastify.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
