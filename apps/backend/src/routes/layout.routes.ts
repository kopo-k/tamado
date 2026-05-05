import type { FastifyInstance } from 'fastify'
import { authenticate } from '../middlewares/auth.middleware.js'
import { layoutController } from '../controllers/layout.controller.js'
 
export async function layoutRoutes(app: FastifyInstance) {
  // 認証がOKの場合実行
  app.get('/', { preHandler: authenticate }, layoutController.getLayouts)
  app.post('/', { preHandler: authenticate }, layoutController.saveLayout)
  app.delete('/:id', { preHandler: authenticate }, layoutController.deleteLayout)
}
 