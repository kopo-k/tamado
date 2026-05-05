// LocalStorageに保存する時のキー名
const STORAGE_KEY = 'tamado_layouts'

// レイアウトの型定義
export type LocalLayout = {
  id: string        // レイアウトを識別するID
  name: string      // レイアウト名（ユーザーがつける名前）
  config: unknown   // 配信の配置情報（JSON）
  createdAt: string // 作成日時
}

export const layoutStorage = {
  // レイアウトをLocalStorageに保存する
  save(layout: Omit<LocalLayout, 'id' | 'createdAt'>): LocalLayout {
    const layouts = this.loadAll() // 既存のレイアウト一覧を取得
    const newLayout: LocalLayout = {
      ...layout,
      id: crypto.randomUUID(),        // ランダムなIDを生成
      createdAt: new Date().toISOString(), // 現在時刻を文字列で保存
    }
    layouts.push(newLayout) // 一覧に追加
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts)) // JSON文字列に変換して保存
    return newLayout
  },

  // LocalStorageからレイアウト一覧を取得する
  loadAll(): LocalLayout[] {
    const raw = localStorage.getItem(STORAGE_KEY) // 文字列として取得
    if (!raw) return [] // 何も保存されていなければ空配列を返す
    return JSON.parse(raw) // JSON文字列をオブジェクトに変換して返す
  },

  // 指定したIDのレイアウトを削除する
  deleteById(id: string) {
    // 削除対象以外のレイアウトだけ残して上書き保存
    const layouts = this.loadAll().filter((l) => l.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts))
  },

  // LocalStorageのレイアウトを全削除する（ログイン時のDB移行後に使う）
  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}