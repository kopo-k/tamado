import { useState, useEffect } from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { layoutStorage } from '../utils/layoutStorage'

type Layout = {
  id: string
  name: string
  config: unknown
  createdAt: string
}

export function useLayouts() {
  const { user } = useAuthStore()
  const [layouts, setLayouts] = useState<Layout[]>([])

  // ログイン状態に応じてレイアウト一覧を取得する
  useEffect(() => {
    if (user) {
      // ログイン済み → APIから取得
      user.getIdToken().then((token) => {
        fetch('/api/layouts', {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setLayouts(data.layouts))
      })
    } else {
      // 未ログイン → LocalStorageから取得
      setLayouts(layoutStorage.loadAll())
    }
  }, [user])

  // レイアウトを保存する
  async function saveLayout(name: string, config: unknown) {
    if (user) {
      // ログイン済み → APIに保存
      const token = await user.getIdToken()
      const res = await fetch('/api/layouts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, config }),
      })
      const data = await res.json()
      setLayouts((prev) => [data.layout, ...prev])
    } else {
      // 未ログイン → LocalStorageに保存
      const newLayout = layoutStorage.save({ name, config })
      setLayouts((prev) => [...prev, newLayout])
    }
  }

  // レイアウトを削除する
  async function deleteLayout(id: string) {
    if (user) {
      // ログイン済み → APIで削除
      const token = await user.getIdToken()
      await fetch(`/api/layouts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setLayouts((prev) => prev.filter((l) => l.id !== id))
    } else {
      // 未ログイン → LocalStorageから削除
      layoutStorage.deleteById(id)
      setLayouts((prev) => prev.filter((l) => l.id !== id))
    }
  }

  return { layouts, saveLayout, deleteLayout }
}