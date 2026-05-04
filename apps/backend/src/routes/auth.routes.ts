import type { FastifyInstance } from 'fastify'
import { authenticate } from '../middlewares/auth.middleware.js'
import { authController } from '../controllers/auth.controller.js'

export async function authRoutes(app: FastifyInstance) {
  app.get('/me', { preHandler: authenticate }, authController.me)
}
