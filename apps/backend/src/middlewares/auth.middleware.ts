import type { FastifyRequest } from 'fastify'
import { verifyToken } from '../utils/jwt.js'
import { UnauthorizedError } from '../errors/AppError.js'
import '../types/auth.js'

const BEARER_PREFIX = 'Bearer '

// JWT設定エラー（サーバーの問題）と認証エラー（クライアントの問題）を区別
function isConfigurationError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('JWT_SECRET') ||
      error.message.includes('DATABASE_URL')
    )
  }
  return false
}

export async function authenticate(request: FastifyRequest): Promise<void> {
  const authHeader = request.headers.authorization
  if (!authHeader?.startsWith(BEARER_PREFIX)) {
    throw new UnauthorizedError('認証トークンが必要です')
  }

  const token = authHeader.slice(BEARER_PREFIX.length)
  try {
    request.user = verifyToken(token)
  } catch (error) {
    // 設定エラーの場合は500として上位に伝播させる
    if (isConfigurationError(error)) {
      throw error
    }
    // JWT検証エラー（期限切れ、署名不正など）は401
    throw new UnauthorizedError('無効なトークンです')
  }
}
