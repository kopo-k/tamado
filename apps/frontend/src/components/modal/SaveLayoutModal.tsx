import { useState } from 'react'
import { Modal } from '../ui/Modal'

type SaveLayoutModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => Promise<void>
}

export function SaveLayoutModal({ isOpen, onClose, onSave }: SaveLayoutModalProps) {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!name.trim()) return
    setIsLoading(true)
    try {
      await onSave(name.trim())
      setName('')
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="レイアウトを保存">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="layout-name"
            className="block text-sm text-apple-text-secondary dark:text-apple-dark-text-secondary mb-1"
          >
            レイアウト名
          </label>
          <input
            id="layout-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：朝の配信セット"
            required
            className="w-full px-4 py-3 bg-apple-bg-secondary border border-apple-border dark:bg-apple-dark-bg-secondary dark:border-apple-dark-border rounded-lg focus:outline-none focus:border-apple-blue dark:focus:border-apple-dark-blue focus:ring-2 focus:ring-apple-blue/20 text-apple-text-primary dark:text-apple-dark-text-primary"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-apple-text-secondary hover:text-apple-text-primary dark:text-apple-dark-text-secondary dark:hover:text-white transition-colors cursor-pointer"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="px-4 py-2 text-sm bg-apple-blue hover:bg-apple-blue/90 dark:bg-apple-dark-blue dark:hover:bg-apple-dark-blue/90 disabled:opacity-50 rounded-lg text-white font-medium transition-colors cursor-pointer"
          >
            {isLoading ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
