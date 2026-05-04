import type { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      uid: string
      email: string
    }
  }
}

export type AuthUser = FastifyRequest['user']
