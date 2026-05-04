import type { FastifyRequest } from 'fastify'
import { auth } from '../lib/firebaseAdmin.js'
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
    const decoded = await auth.verifyIdToken(token)
    request.user = {
      uid: decoded.uid,
      email: decoded.email ?? '',
    }
  } catch {
    throw new UnauthorizedError('無効なトークンです')
  }
}
