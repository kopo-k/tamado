import type { FastifyRequest, FastifyReply } from 'fastify'
import { authService } from '../services/auth.service.js'

export const authController = {
  async me(request: FastifyRequest, reply: FastifyReply) {
    const { uid, email } = request.user!

    const user = await authService.syncUser(uid, email)

    return reply.status(200).send({ user })
  },
}
