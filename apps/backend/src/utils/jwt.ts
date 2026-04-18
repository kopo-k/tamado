import jwt from 'jsonwebtoken'

export type JwtPayload = {
  userId: string
}

const EXPIRES_IN = '7d'

const MIN_SECRET_LENGTH = 32

function getSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not set')
  }
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters`)
  }
  return secret
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: EXPIRES_IN })
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, getSecret())
  if (typeof decoded === 'string' || !('userId' in decoded)) {
    throw new Error('Invalid token payload')
  }
  return { userId: decoded.userId as string }
}
