import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthStore } from './useAuthStore'
import { authApi } from '@/lib/auth.api'

vi.mock('@/lib/auth.api', () => ({
  authApi: {
    register: vi.fn(),
    login: vi.fn(),
    me: vi.fn(),
  },
}))

const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
  useAuthStore.setState({ user: null, token: null })
})

describe('useAuthStore', () => {
  describe('login', () => {
    it('成功するとuserとtokenをセットし、localStorageに保存する', async () => {
      vi.mocked(authApi.login).mockResolvedValue({
        user: mockUser,
        token: 'jwt-token-abc',
      })

      await useAuthStore.getState().login({
        email: 'test@example.com',
        password: 'password123',
      })

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockUser)
      expect(state.token).toBe('jwt-token-abc')
      expect(localStorage.getItem('auth-token')).toBe('jwt-token-abc')
    })
  })

  describe('register', () => {
    it('成功するとuserとtokenをセットし、localStorageに保存する', async () => {
      vi.mocked(authApi.register).mockResolvedValue({
        user: mockUser,
        token: 'jwt-token-xyz',
      })

      await useAuthStore.getState().register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockUser)
      expect(state.token).toBe('jwt-token-xyz')
      expect(localStorage.getItem('auth-token')).toBe('jwt-token-xyz')
    })
  })

  describe('logout', () => {
    it('userとtokenをnullにし、localStorageから削除する', () => {
      useAuthStore.setState({ user: mockUser, token: 'some-token' })
      localStorage.setItem('auth-token', 'some-token')

      useAuthStore.getState().logout()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(localStorage.getItem('auth-token')).toBeNull()
    })
  })

  describe('initialize', () => {
    it('localStorageにトークンがあれば/meでユーザーを復元する', async () => {
      localStorage.setItem('auth-token', 'saved-token')
      vi.mocked(authApi.me).mockResolvedValue({ user: mockUser })

      await useAuthStore.getState().initialize()

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockUser)
      expect(state.token).toBe('saved-token')
      expect(authApi.me).toHaveBeenCalledWith('saved-token')
    })

    it('localStorageにトークンがなければ何もしない', async () => {
      await useAuthStore.getState().initialize()

      expect(authApi.me).not.toHaveBeenCalled()
      expect(useAuthStore.getState().user).toBeNull()
    })

    it('/meが失敗したらトークンを破棄する（期限切れ等）', async () => {
      localStorage.setItem('auth-token', 'expired-token')
      vi.mocked(authApi.me).mockRejectedValue(new Error('Unauthorized'))

      await useAuthStore.getState().initialize()

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(localStorage.getItem('auth-token')).toBeNull()
    })
  })
})
