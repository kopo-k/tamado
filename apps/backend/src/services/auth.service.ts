import { userRepository } from '../repositories/user.repository.js'

export const authService = {
  async syncUser(uid: string, email: string) {
    return userRepository.upsert({ id: uid, email })
  },

  async getMe(uid: string) {
    return userRepository.findById(uid)
  },
}
