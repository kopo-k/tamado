import { create } from 'zustand'

type UIStore = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  autoLayoutRequestId: number
  requestAutoLayout: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  autoLayoutRequestId: 0,
  requestAutoLayout: () => set((state) => ({ autoLayoutRequestId: state.autoLayoutRequestId + 1 })),
}))
