import { layoutRepository } from '../repositories/layout.repository.js'

export const layoutService = {
  // ユーザーのレイアウト一覧を取得する非同期関数
  async getLayouts(userId: string) {
    // repository の findByUserId を呼び出し
    // userId に紐づく全てのレイアウトを取得
    return layoutRepository.findByUserId(userId)
    // 結果: レイアウト一覧の配列を返す
  },

  // 新しいレイアウトを保存する非同期関数
  async saveLayout(userId: string, name: string, config: unknown) {
    // repository の create を呼び出し
    // userId, name, config を使って新しいレコードを作成
    return layoutRepository.create(userId, name, config)
    // 結果: 作成されたレイアウトのレコードを返す
  },

  // レイアウトを削除する非同期関数
  async deleteLayout(userId: string, layoutId: string) {
    // repository の deleteById を呼び出し
    // layoutId と userId で特定したレコードを削除
    // （userId を含めることで、他ユーザーのデータ削除を防止）
    return layoutRepository.deleteById(layoutId, userId)
    // 結果: 削除されたレイアウトのレコードを返す
  },
}