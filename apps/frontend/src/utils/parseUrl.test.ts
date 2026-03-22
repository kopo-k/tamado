import { parseStreamUrl } from './parseUrl'

describe('parseStreamUrl', () => {
  describe('YouTube', () => {
    it('youtube.com/watch?v= のURLを解析できる', () => {
      const result = parseStreamUrl('https://www.youtube.com/watch?v=YIFDiECQUe8')
      expect(result).toEqual({ platform: 'youtube', id: 'YIFDiECQUe8' })
    })

    it('youtube.com/live/ のURLを解析できる', () => {
      const result = parseStreamUrl('https://www.youtube.com/live/abc123')
      expect(result).toEqual({ platform: 'youtube', id: 'abc123' })
    })

    it('youtu.be/ の短縮URLを解析できる', () => {
      const result = parseStreamUrl('https://youtu.be/YIFDiECQUe8')
      expect(result).toEqual({ platform: 'youtube', id: 'YIFDiECQUe8' })
    })

    it('クエリパラメータ付きの短縮URLを解析できる', () => {
      const result = parseStreamUrl('https://youtu.be/YIFDiECQUe8?t=120')
      expect(result).toEqual({ platform: 'youtube', id: 'YIFDiECQUe8' })
    })
  })

  describe('Twitch', () => {
    it('twitch.tv/ のURLを解析できる', () => {
      const result = parseStreamUrl('https://www.twitch.tv/channelname')
      expect(result).toEqual({ platform: 'twitch', id: 'channelname' })
    })

    it('クエリパラメータ付きのTwitch URLを解析できる', () => {
      const result = parseStreamUrl('https://www.twitch.tv/channelname?ref=home')
      expect(result).toEqual({ platform: 'twitch', id: 'channelname' })
    })
  })

  describe('無効なURL', () => {
    it('不正なURLはnullを返す', () => {
      expect(parseStreamUrl('https://example.com')).toBeNull()
    })

    it('空文字はnullを返す', () => {
      expect(parseStreamUrl('')).toBeNull()
    })

    it('通常のテキストはnullを返す', () => {
      expect(parseStreamUrl('hello world')).toBeNull()
    })
  })
})
