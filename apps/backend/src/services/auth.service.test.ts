import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { authService } from './auth.service.js'
import { userRepository } from '../repositories/user.repository.js'
import { hashPassword } from '../utils/password.js'
import { ConflictError, NotFoundError, UnauthorizedError } from '../errors/AppError.js'

vi.mock('../repositories/user.repository.js', () => ({
  userRepository: {
    findByEmail: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
  },
}))

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-key-at-least-32-chars-long'
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('authService', () => {
  describe('register', () => {
    it('新規ユーザーを作成してJWTトークンを返す', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null)
      vi.mocked(userRepository.create).mockImplementation(async (data) => ({
        id: 'user-123',
        email: data.email,
        password: data.password,
        name: data.name ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })

      expect(result.user.email).toBe('test@example.com')
      expect(result.user).not.toHaveProperty('password')
      expect(typeof result.token).toBe('string')
    })

    it('既存のメールアドレスでConflictErrorを投げる', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue({
        id: 'user-existing',
        email: 'taken@example.com',
        password: 'hashed',
        name: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await expect(
        authService.register({
          email: 'taken@example.com',
          password: 'password123',
        })
      ).rejects.toThrow(ConflictError)
    })
  })

  describe('login', () => {
    it('有効な認証情報でJWTトークンを返す', async () => {
      const hashed = await hashPassword('password123')
      vi.mocked(userRepository.findByEmail).mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        password: hashed,
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result.user.email).toBe('test@example.com')
      expect(result.user).not.toHaveProperty('password')
      expect(typeof result.token).toBe('string')
    })

    it('存在しないメールでUnauthorizedErrorを投げる', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null)

      await expect(
        authService.login({
          email: 'notfound@example.com',
          password: 'password123',
        })
      ).rejects.toThrow(UnauthorizedError)
    })

    it('パスワードが違うとUnauthorizedErrorを投げる', async () => {
      const hashed = await hashPassword('correct-password')
      vi.mocked(userRepository.findByEmail).mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        password: hashed,
        name: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrong-password',
        })
      ).rejects.toThrow(UnauthorizedError)
    })
  })

  describe('getMe', () => {
    it('指定したIDのユーザー情報を返す（パスワードは含まない）', async () => {
      vi.mocked(userRepository.findById).mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const user = await authService.getMe('user-123')

      expect(user.id).toBe('user-123')
      expect(user.email).toBe('test@example.com')
      expect(user).not.toHaveProperty('password')
    })

    it('存在しないIDでNotFoundErrorを投げる', async () => {
      vi.mocked(userRepository.findById).mockResolvedValue(null)

      await expect(authService.getMe('not-exist')).rejects.toThrow(NotFoundError)
    })
  })
})
