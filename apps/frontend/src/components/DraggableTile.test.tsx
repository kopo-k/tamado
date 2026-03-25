import { render, screen } from '@testing-library/react'
import { DndContext } from '@dnd-kit/core'
import { useStreamStore } from '@/stores/useStreamStore'
import { DraggableTile } from './DraggableTile'

describe('DraggableTile', () => {
  const defaultStream = {
    id: '1',
    platform: 'youtube' as const,
    videoId: 'YIFDiECQUe8',
    embedUrl: 'https://www.youtube.com/embed/YIFDiECQUe8',
    x: 0,
    y: 0,
  }

  const renderDraggableTile = (stream = defaultStream) => {
    render(
      <DndContext>
        <DraggableTile stream={stream} />
      </DndContext>
    )
  }

  beforeEach(() => {
    useStreamStore.setState({ streams: [] })
  })

  it('iframeが表示される', () => {
    renderDraggableTile()
    expect(screen.getByTitle(/player/i)).toBeInTheDocument()
  })

  it('削除ボタンが表示される', () => {
    renderDraggableTile()
    expect(screen.getByRole('button', { name: /削除/i })).toBeInTheDocument()
  })

  it('位置がstyleで反映される', () => {
    renderDraggableTile({ ...defaultStream, x: 100, y: 200 })
    const tile = screen.getByRole('button', { name: /ドラッグ/i }).parentElement
    expect(tile).toHaveStyle({ left: '100px', top: '200px' })
  })

  it('ドラッグハンドルが表示される', () => {
    renderDraggableTile()
    expect(screen.getByRole('button', { name: /ドラッグ/i })).toBeInTheDocument()
  })
})
