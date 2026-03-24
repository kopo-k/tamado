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
      },
      onRemove: vi.fn(),
    }

    render(<StreamTile {...twitchProps} />)
    const iframe = screen.getByTitle(/player/i)
    expect(iframe).toHaveAttribute('src', 'https://player.twitch.tv/?channel=channelname&parent=localhost')
  })
})
