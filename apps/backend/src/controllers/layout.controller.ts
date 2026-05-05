
import type { FastifyRequest, FastifyReply } from 'fastify'
import { layoutService } from '../services/layout.service.js'
 
// userのレイアウトの一覧を返す
export const layoutController = {
  async getLayouts(request: FastifyRequest, reply: FastifyReply) {
    const { uid } = request.user!
    const layouts = await layoutService.getLayouts(uid)
    return reply.status(200).send({ layouts })
  },
  // レイアウト保存ボタンを押した時に保存一覧に表示するため
  async saveLayout(request: FastifyRequest, reply: FastifyReply) {
    const { uid } = request.user!
    const { name, config } = request.body as { name: string; config: unknown }
    const layout = await layoutService.saveLayout(uid, name, config)
    return reply.status(201).send({ layout })
  },
  // フロント側に削除が成功したことを伝えるもの
  async deleteLayout(request: FastifyRequest, reply: FastifyReply) {
    const { uid } = request.user!
    const { id } = request.params as { id: string }
    await layoutService.deleteLayout(uid, id)
    return reply.status(204).send()
  },
}
 