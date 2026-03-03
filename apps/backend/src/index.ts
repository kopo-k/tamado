import Fastify from 'fastify'
import { loggerConfig } from './config/logger.js'

const fastify = Fastify({
  logger: loggerConfig,
})

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
