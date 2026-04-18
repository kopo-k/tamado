import { describe, it, expect, beforeAll } from 'vitest'
import Fastify, { type FastifyInstance } from 'fastify'
import { authenticate } from './auth.middleware.js'
import { errorHandler } from '../plugins/errorHandler.js'
import { generateToken } from '../utils/jwt.js'

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-key-at-least-32-chars-long'
})

async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify()
  await app.register(errorHandler)
  app.get('/protected', { preHandler: authenticate }, async (request) => {
    return { userId: request.user?.userId }
  })
  return app
}

describe('authenticate middleware', () => {
  it('有効なトークンでrequest.userをセットして処理が通る', async () => {
    const app = await buildApp()
    const token = generateToken({ userId: 'user-123' })

    const res = await app.inject({
      method: 'GET',
      url: '/protected',
      headers: { authorization: `Bearer ${token}` },
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual({ userId: 'user-123' })
  })

  it('Authorizationヘッダーがないと401を返す', async () => {
    const app = await buildApp()

    const res = await app.inject({ method: 'GET', url: '/protected' })

    expect(res.statusCode).toBe(401)
  })

  it('Bearerプレフィックスがないと401を返す', async () => {
    const app = await buildApp()

    const res = await app.inject({
      method: 'GET',
      url: '/protected',
      headers: { authorization: 'InvalidScheme token' },
    })

    expect(res.statusCode).toBe(401)
  })

  it('無効なトークンで401を返す', async () => {
    const app = await buildApp()

    const res = await app.inject({
      method: 'GET',
      url: '/protected',
      headers: { authorization: 'Bearer invalid.token.here' },
    })

    expect(res.statusCode).toBe(401)
  })
})
