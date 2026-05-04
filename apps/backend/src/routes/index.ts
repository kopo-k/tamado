import type { FastifyInstance } from 'fastify'
import { authRoutes } from './auth.routes.js'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(authRoutes, { prefix: '/api/auth' })
}
