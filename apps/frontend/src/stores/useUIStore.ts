import { create } from 'zustand'

type UIStore = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  autoLayoutRequested: boolean
  requestAutoLayout: () => void
  resetAutoLayoutRequest: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  autoLayoutRequested: false,
  requestAutoLayout: () => set({ autoLayoutRequested: true }),
  resetAutoLayoutRequest: () => set({ autoLayoutRequested: false }),
}))
