import type { User } from '../../generated/prisma/client.js'
import { prisma } from '../config/prisma.js'

export type CreateUserInput = {
  email: string
  password: string
  name?: string
}

export const userRepository = {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } })
  },

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  },

  create(data: CreateUserInput): Promise<User> {
    return prisma.user.create({ data })
  },
}
