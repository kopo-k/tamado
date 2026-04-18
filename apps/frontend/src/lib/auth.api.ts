import { apiFetch } from './api'
import type { AuthResult, RegisterInput, LoginInput, User } from '@/types/auth'

export const authApi = {
  register(input: RegisterInput): Promise<AuthResult> {
    return apiFetch<AuthResult>('/api/auth/register', {
      method: 'POST',
      body: input,
    })
  },

  login(input: LoginInput): Promise<AuthResult> {
    return apiFetch<AuthResult>('/api/auth/login', {
      method: 'POST',
      body: input,
    })
  },

  me(token: string): Promise<{ user: User }> {
    return apiFetch<{ user: User }>('/api/auth/me', {
      method: 'GET',
      token,
    })
  },
}
