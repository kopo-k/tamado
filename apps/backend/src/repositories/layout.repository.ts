import { prisma } from '../lib/prisma.js'

// layoutRepository をエクスポート（他のファイルから使える）
export const layoutRepository = {
  // ユーザーのレイアウト一覧を取得する非同期関数
  async findByUserId(userId: string) {
    // prisma.layout = layout テーブルにアクセス
    return prisma.layout.findMany({
      // where = 条件絞り込み（userId が一致するレコード）
      where: { userId },
      // orderBy = 並び替え（createdAt が新しい順）
      orderBy: { createdAt: 'desc' },
    })
    // 結果: userId に紐づく全てのレイアウトを、新しい順で返す
  },

  // 新しいレイアウトを作成する非同期関数
  async create(userId: string, name: string, config: unknown) {
    return prisma.layout.create({
      // data = 保存するデータを指定
      // userId: ユーザーID
      // name: レイアウト名
      // config: レイアウト設定（any型）
      data: { userId, name, config },
    })
    // 結果: 新規作成されたレイアウトのレコードを返す
  },

  // レイアウトを削除する非同期関数
  async deleteById(id: string, userId: string) {
    return prisma.layout.delete({
      // where = 削除対象を指定
      // id と userId の両方で特定（セキュリティ：他ユーザーのデータ削除防止）
      where: { id, userId },
    })
    // 結果: 削除されたレイアウトのレコードを返す
  },
}