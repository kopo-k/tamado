import { vi } from 'vitest'

export const firebaseApp = {}

export const firebaseAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
}
