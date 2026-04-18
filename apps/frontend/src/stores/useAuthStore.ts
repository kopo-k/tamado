import { create } from 'zustand'
import { authApi } from '@/lib/auth.api'
import type { User, RegisterInput, LoginInput } from '@/types/auth'

const TOKEN_KEY = 'auth-token'

type AuthStore = {
  user: User | null
  token: string | null
  register: (input: RegisterInput) => Promise<void>
  login: (input: LoginInput) => Promise<void>
  logout: () => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  async register(input) {
    const result = await authApi.register(input)
    localStorage.setItem(TOKEN_KEY, result.token)
    set({ user: result.user, token: result.token })
  },

  async login(input) {
    const result = await authApi.login(input)
    localStorage.setItem(TOKEN_KEY, result.token)
    set({ user: result.user, token: result.token })
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    set({ user: null, token: null })
  },

  async initialize() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return

    try {
      const { user } = await authApi.me(token)
      set({ user, token })
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      set({ user: null, token: null })
    }
  },
}))
