import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword } from './password.js'

describe('password', () => {
  describe('hashPassword', () => {
    it('パスワードをハッシュ化して、元の文字列とは異なる値を返す', async () => {
      const plain = 'my-password-1234'
      const hashed = await hashPassword(plain)

      expect(hashed).not.toBe(plain)
      expect(hashed.length).toBeGreaterThan(plain.length)
    })

    it('同じパスワードでも異なるハッシュを生成する（ソルトが効いている）', async () => {
      const plain = 'my-password-1234'
      const hash1 = await hashPassword(plain)
      const hash2 = await hashPassword(plain)

      expect(hash1).not.toBe(hash2)
    })
  })

  describe('verifyPassword', () => {
    it('正しいパスワードで検証に成功する', async () => {
      const plain = 'my-password-1234'
      const hashed = await hashPassword(plain)

      const result = await verifyPassword(plain, hashed)

      expect(result).toBe(true)
    })

    it('間違ったパスワードで検証に失敗する', async () => {
      const plain = 'my-password-1234'
      const wrong = 'wrong-password'
      const hashed = await hashPassword(plain)

      const result = await verifyPassword(wrong, hashed)

      expect(result).toBe(false)
    })
  })
})
