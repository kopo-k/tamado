import type { FastifyRequest } from 'fastify'
import { verifyToken } from '../utils/jwt.js'
import { UnauthorizedError } from '../errors/AppError.js'
import '../types/auth.js'

const BEARER_PREFIX = 'Bearer '

export async function authenticate(request: FastifyRequest): Promise<void> {
  const authHeader = request.headers.authorization
  if (!authHeader?.startsWith(BEARER_PREFIX)) {
    throw new UnauthorizedError('認証トークンが必要です')
  }

  const token = authHeader.slice(BEARER_PREFIX.length)
  try {
    request.user = verifyToken(token)
  } catch {
    throw new UnauthorizedError('無効なトークンです')
  }
}
