import { create } from 'zustand'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { firebaseAuth } from '../lib/firebase'

type AuthStore = {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  initialize: () => () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  async login(email, password) {
    set({ error: null })
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      set({ error: firebaseErrorMessage(code) })
      throw err
    }
  },

  async signup(email, password) {
    set({ error: null })
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      set({ error: firebaseErrorMessage(code) })
      throw err
    }
  },

  async logout() {
    await signOut(firebaseAuth)
  },

  clearError() {
    set({ error: null })
  },

  initialize() {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      set({ user, loading: false })
    })
    return unsubscribe
  },
}))

function firebaseErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'メールアドレスまたはパスワードが正しくありません'
    case 'auth/email-already-in-use':
      return 'このメールアドレスはすでに使用されています'
    case 'auth/weak-password':
      return 'パスワードは6文字以上で入力してください'
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません'
    case 'auth/too-many-requests':
      return 'ログイン試行が多すぎます。しばらく待ってから再試行してください'
    default:
      return '予期しないエラーが発生しました'
  }
}
