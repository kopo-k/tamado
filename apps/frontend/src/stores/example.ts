import { create } from 'zustand'

// サンプルストア - 実際の実装時に適切なストアに置き換えてください
interface ExampleState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
