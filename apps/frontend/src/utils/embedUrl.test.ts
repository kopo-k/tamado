import { getEmbedUrl } from './embedUrl'

describe('getEmbedUrl', () => {
  it('YouTubeの埋め込みURLを生成できる', () => {
    const result = getEmbedUrl('youtube', 'YIFDiECQUe8')
    expect(result).toBe('https://www.youtube.com/embed/YIFDiECQUe8')
  })

  it('Twitchの埋め込みURLを生成できる', () => {
    const result = getEmbedUrl('twitch', 'channelname')
    expect(result).toContain('https://player.twitch.tv/?channel=channelname')
    expect(result).toContain('parent=')
  })

  it('不明なプラットフォームはnullを返す', () => {
    expect(getEmbedUrl('unknown', 'test')).toBeNull()
  })
})
