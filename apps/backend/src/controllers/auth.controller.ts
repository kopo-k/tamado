import type { FastifyRequest, FastifyReply } from 'fastify'
import { authService } from '../services/auth.service.js'
import { registerSchema, loginSchema } from '../schemas/auth.js'
import { UnauthorizedError } from '../errors/AppError.js'

export const authController = {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const body = registerSchema.parse(request.body)
    const result = await authService.register(body)
    return reply.code(201).send(result)
  },

  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = loginSchema.parse(request.body)
    const result = await authService.login(body)
    return reply.send(result)
  },

  async me(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.userId
    if (!userId) {
      throw new UnauthorizedError('認証が必要です')
    }
    const user = await authService.getMe(userId)
    return reply.send({ user })
  },
}
