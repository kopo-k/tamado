import { X, Sun, Moon, Save, FolderOpen, User, Settings, LayoutGrid, Flame } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/hooks/useTheme'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  onAutoLayout?: () => void
  onOpenSaveModal?: () => void
  onOpenLoadModal?: () => void
}

export function Sidebar({
  isOpen,
  onClose,
  onAutoLayout,
  onOpenSaveModal,
  onOpenLoadModal,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme()
  const [excitementDetection, setExcitementDetection] = useState(false)

  return (
    <>
      {/* オーバーレイ背景 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* サイドバー本体 */}
      <aside
        role="complementary"
        className={`fixed top-0 left-0 h-full w-64 bg-apple-card dark:bg-apple-dark-bg-secondary border-r border-apple-border dark:border-apple-dark-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-apple-border dark:border-apple-dark-border">
          <span className="text-lg font-semibold text-apple-blue dark:text-apple-dark-blue">
            メニュー
          </span>
          <button
            onClick={onClose}
            aria-label="閉じる"
            className="p-2.5 text-apple-text-secondary hover:text-apple-text-primary dark:text-apple-dark-text-secondary dark:hover:text-apple-dark-blue transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-apple-bg-secondary dark:hover:bg-apple-dark-card"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* メニュー内容 */}
        <nav className="p-4 space-y-6">
          {/* レイアウト */}
          <MenuSection title="レイアウト" icon={<LayoutGrid className="w-4 h-4" />}>
            <MenuItem onClick={() => { onAutoLayout?.(); onClose(); }}>
              自動レイアウト
            </MenuItem>
          </MenuSection>

          {/* 盛り上がり */}
          <MenuSection title="盛り上がり" icon={<Flame className="w-4 h-4" />}>
            <ToggleItem
              label="盛り上がり検知"
              enabled={excitementDetection}
              onToggle={() => setExcitementDetection(!excitementDetection)}
            />
          </MenuSection>

          {/* 保存/読込 */}
          <MenuSection title="保存/読込" icon={<Save className="w-4 h-4" />}>
            <MenuItem onClick={() => { onOpenSaveModal?.(); onClose(); }}>
              <Save className="w-4 h-4" />
              レイアウト保存
            </MenuItem>
            <MenuItem onClick={() => { onOpenLoadModal?.(); onClose(); }}>
              <FolderOpen className="w-4 h-4" />
              レイアウト読込
            </MenuItem>
          </MenuSection>

          {/* 設定 */}
          <MenuSection title="設定" icon={<Settings className="w-4 h-4" />}>
            <MenuItem onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'ライトモード' : 'ダークモード'}
            </MenuItem>
          </MenuSection>
        </nav>

        {/* ユーザー情報 */}
        <div
          data-testid="user-info"
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-apple-border dark:border-apple-dark-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-apple-bg-secondary dark:bg-apple-dark-card flex items-center justify-center">
              <User className="w-5 h-5 text-apple-text-secondary dark:text-apple-dark-text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-apple-text-primary dark:text-apple-dark-text-primary">
                ゲスト
              </p>
              <p className="text-xs text-apple-text-secondary dark:text-apple-dark-text-secondary">
                ログインしていません
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// カテゴリセクション
type MenuSectionProps = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function MenuSection({ title, icon, children }: MenuSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-apple-blue dark:text-apple-dark-blue text-sm font-medium mb-2">
        {icon}
        {title}
      </div>
      <div className="space-y-1 ml-6">
        {children}
      </div>
    </div>
  )
}

// メニューアイテム
type MenuItemProps = {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

function MenuItem({ onClick, disabled, children }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
        disabled
          ? 'text-apple-text-secondary dark:text-apple-dark-text-secondary cursor-not-allowed'
          : 'text-apple-text-primary hover:bg-apple-bg-secondary hover:text-apple-blue dark:text-apple-dark-text-primary dark:hover:bg-apple-dark-card dark:hover:text-apple-dark-blue cursor-pointer'
      }`}
    >
      {children}
    </button>
  )
}

// トグルアイテム
type ToggleItemProps = {
  label: string
  enabled: boolean
  onToggle: () => void
}

function ToggleItem({ label, enabled, onToggle }: ToggleItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      aria-label={`${label}を${enabled ? 'オフ' : 'オン'}にする`}
      className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm text-apple-text-primary hover:bg-apple-bg-secondary dark:text-apple-dark-text-primary dark:hover:bg-apple-dark-card transition-all duration-200 cursor-pointer min-h-[44px]"
    >
      <span>{label}</span>
      <div
        aria-hidden="true"
        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
          enabled ? 'bg-apple-blue shadow-apple dark:bg-apple-dark-blue' : 'bg-apple-border dark:bg-apple-dark-border'
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  )
}
