export type User = {
  id: string
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export type AuthResult = {
  user: User
  token: string
}

export type RegisterInput = {
  email: string
  password: string
  name?: string
}

export type LoginInput = {
  email: string
  password: string
}
