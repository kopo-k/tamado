import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StreamTile } from './StreamTile'

describe('StreamTile', () => {
  const defaultProps = {
    stream: {
      id: '1',
      platform: 'youtube' as const,
      videoId: 'YIFDiECQUe8',
      embedUrl: 'https://www.youtube.com/embed/YIFDiECQUe8',
      x: 0,
      y: 0,
    },
    onRemove: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('iframeが表示される', () => {
    render(<StreamTile {...defaultProps} />)
    const iframe = screen.getByTitle(/player/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/YIFDiECQUe8')
  })

  it('削除ボタンが表示される', () => {
    render(<StreamTile {...defaultProps} />)
    expect(screen.getByRole('button', { name: /削除/i })).toBeInTheDocument()
  })

  it('削除ボタンをクリックすると onRemove が呼ばれる', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()

    render(<StreamTile {...defaultProps} onRemove={onRemove} />)
    await user.click(screen.getByRole('button', { name: /削除/i }))

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('Twitchのストリームも表示できる', () => {
    const twitchProps = {
      stream: {
        id: '2',
        platform: 'twitch' as const,
        videoId: 'channelname',
        embedUrl: 'https://player.twitch.tv/?channel=channelname&parent=localhost',
        x: 0,
        y: 0,
      },
      onRemove: vi.fn(),
    }

    render(<StreamTile {...twitchProps} />)
    const iframe = screen.getByTitle(/player/i)
    expect(iframe).toHaveAttribute('src', 'https://player.twitch.tv/?channel=channelname&parent=localhost')
  })

  it('音声ON時に音声OFFボタンが表示される', () => {
    const props = {
      ...defaultProps,
      stream: { ...defaultProps.stream, isMuted: false },
      onToggleMute: vi.fn(),
    }
    render(<StreamTile {...props} />)
    expect(screen.getByRole('button', { name: /音声をOFFにする/i })).toBeInTheDocument()
  })

  it('音声OFF時に音声ONボタンが表示される', () => {
    const props = {
      ...defaultProps,
      stream: { ...defaultProps.stream, isMuted: true },
      onToggleMute: vi.fn(),
    }
    render(<StreamTile {...props} />)
    expect(screen.getByRole('button', { name: /音声をONにする/i })).toBeInTheDocument()
  })

  it('音声切替ボタンをクリックすると onToggleMute が呼ばれる', async () => {
    const onToggleMute = vi.fn()
    const user = userEvent.setup()
    const props = {
      ...defaultProps,
      stream: { ...defaultProps.stream, isMuted: false },
      onToggleMute,
    }

    render(<StreamTile {...props} />)
    await user.click(screen.getByRole('button', { name: /音声をOFFにする/i }))

    expect(onToggleMute).toHaveBeenCalledTimes(1)
  })

  it('アクセシビリティ: 音声ON/OFFが aria-label で伝えられる', () => {
    const propsUnmuted = {
      ...defaultProps,
      stream: { ...defaultProps.stream, isMuted: false },
    }
    const { container: containerUnmuted } = render(<StreamTile {...propsUnmuted} />)
    expect(containerUnmuted.querySelector('[aria-label="音声ON"]')).toBeInTheDocument()

    const propsMuted = {
      ...defaultProps,
      stream: { ...defaultProps.stream, isMuted: true },
    }
    const { container: containerMuted } = render(<StreamTile {...propsMuted} />)
    expect(containerMuted.querySelector('[aria-label="音声OFF"]')).toBeInTheDocument()
  })
})
