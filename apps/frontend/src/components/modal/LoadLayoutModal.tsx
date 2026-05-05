import { Trash2 } from 'lucide-react'
import { Modal } from '../ui/Modal'

type Layout = {
  id: string
  name: string
  config: unknown
  createdAt: string
}

type LoadLayoutModalProps = {
  isOpen: boolean
  onClose: () => void
  layouts: Layout[]
  onLoad: (layout: Layout) => void
  onDelete: (id: string) => Promise<void>
}

export function LoadLayoutModal({ isOpen, onClose, layouts, onLoad, onDelete }: LoadLayoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="レイアウトを読込">
      {layouts.length === 0 ? (
        <p className="text-sm text-apple-text-secondary dark:text-apple-dark-text-secondary text-center py-6">
          保存されたレイアウトがありません
        </p>
      ) : (
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {layouts.map((layout) => (
            <li
              key={layout.id}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-apple-bg-secondary dark:hover:bg-apple-dark-bg group"
            >
              <button
                type="button"
                onClick={() => { onLoad(layout); onClose() }}
                className="flex-1 text-left text-sm text-apple-text-primary dark:text-apple-dark-text-primary cursor-pointer"
              >
                {layout.name}
              </button>
              <button
                type="button"
                onClick={() => onDelete(layout.id)}
                aria-label={`${layout.name}を削除`}
                className="p-1.5 text-apple-text-secondary hover:text-red-500 dark:text-apple-dark-text-secondary dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}
