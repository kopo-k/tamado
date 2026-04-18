import type { User } from '../../generated/prisma/client.js'
import { userRepository } from '../repositories/user.repository.js'
import { hashPassword, verifyPassword } from '../utils/password.js'
import { generateToken } from '../utils/jwt.js'
import { ConflictError, NotFoundError, UnauthorizedError } from '../errors/AppError.js'
import type { RegisterInput, LoginInput } from '../schemas/auth.js'

export type UserDTO = {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export type AuthResult = {
  user: UserDTO
  token: string
}

function toUserDTO(user: User): UserDTO {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await userRepository.findByEmail(input.email)
    if (existing) {
      throw new ConflictError('このメールアドレスは既に使用されています')
    }

    const hashed = await hashPassword(input.password)
    const user = await userRepository.create({
      email: input.email,
      password: hashed,
      name: input.name,
    })

    const token = generateToken({ userId: user.id })
    return { user: toUserDTO(user), token }
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await userRepository.findByEmail(input.email)
    if (!user) {
      throw new UnauthorizedError('メールアドレスまたはパスワードが正しくありません')
    }

    const valid = await verifyPassword(input.password, user.password)
    if (!valid) {
      throw new UnauthorizedError('メールアドレスまたはパスワードが正しくありません')
    }

    const token = generateToken({ userId: user.id })
    return { user: toUserDTO(user), token }
  },

  async getMe(userId: string): Promise<UserDTO> {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new NotFoundError('ユーザーが見つかりません')
    }
    return toUserDTO(user)
  },
}
