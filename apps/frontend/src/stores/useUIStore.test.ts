import { useUIStore } from './useUIStore'

describe('useUIStore', () => {
  beforeEach(() => {
    useUIStore.setState({ isSidebarOpen: false })
  })

  it('初期状態でサイドバーは閉じている', () => {
    expect(useUIStore.getState().isSidebarOpen).toBe(false)
  })

  it('openSidebarでサイドバーが開く', () => {
    useUIStore.getState().openSidebar()
    expect(useUIStore.getState().isSidebarOpen).toBe(true)
  })

  it('closeSidebarでサイドバーが閉じる', () => {
    useUIStore.getState().openSidebar()
    useUIStore.getState().closeSidebar()
    expect(useUIStore.getState().isSidebarOpen).toBe(false)
  })
})
