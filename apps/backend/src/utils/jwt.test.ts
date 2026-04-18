import { describe, it, expect, beforeAll } from 'vitest'
import { generateToken, verifyToken } from './jwt.js'

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-key-at-least-32-chars-long'
})

describe('jwt', () => {
  describe('generateToken', () => {
    it('ペイロードからJWTトークンを生成する', () => {
      const token = generateToken({ userId: 'user-123' })

      expect(typeof token).toBe('string')
      expect(token.split('.').length).toBe(3)
    })

    it('同じペイロードでも発行ごとに異なるトークンを生成する（iatが違う）', async () => {
      const token1 = generateToken({ userId: 'user-123' })
      await new Promise(resolve => setTimeout(resolve, 1100))
      const token2 = generateToken({ userId: 'user-123' })

      expect(token1).not.toBe(token2)
    })
  })

  describe('verifyToken', () => {
    it('有効なトークンからペイロードを取り出せる', () => {
      const token = generateToken({ userId: 'user-123' })

      const payload = verifyToken(token)

      expect(payload.userId).toBe('user-123')
    })

    it('不正なトークンでエラーを投げる', () => {
      expect(() => verifyToken('invalid.token.here')).toThrow()
    })
  })
})
