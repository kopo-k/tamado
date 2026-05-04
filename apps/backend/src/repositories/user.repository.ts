import { prisma } from '../lib/prisma.js'

export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  },

  async upsert(data: { id: string; email: string; name?: string }) {
    return prisma.user.upsert({
      where: { id: data.id },
      update: { email: data.email },
      create: { id: data.id, email: data.email, name: data.name },
    })
  },
}
