import { useStreamStore } from './useStreamStore'

describe('useStreamStore', () => {
  beforeEach(() => {
    useStreamStore.setState({ streams: [] })
  })

  it('初期状態でstreamsは空配列', () => {
    expect(useStreamStore.getState().streams).toEqual([])
  })

  it('addStreamでYouTube URLを追加できる', () => {
    const result = useStreamStore.getState().addStream('https://www.youtube.com/watch?v=YIFDiECQUe8')

    expect(result).toBe(true)
    const streams = useStreamStore.getState().streams
    expect(streams).toHaveLength(1)
    expect(streams[0].platform).toBe('youtube')
    expect(streams[0].videoId).toBe('YIFDiECQUe8')
    expect(streams[0].embedUrl).toBe('https://www.youtube.com/embed/YIFDiECQUe8')
    expect(streams[0].x).toBe(0)
    expect(streams[0].y).toBe(0)
  })

  it('addStreamでTwitch URLを追加できる', () => {
    const result = useStreamStore.getState().addStream('https://www.twitch.tv/channelname')

    expect(result).toBe(true)
    const streams = useStreamStore.getState().streams
    expect(streams).toHaveLength(1)
    expect(streams[0].platform).toBe('twitch')
    expect(streams[0].videoId).toBe('channelname')
  })

  it('不正なURLはfalseを返す', () => {
    const result = useStreamStore.getState().addStream('https://example.com')

    expect(result).toBe(false)
    expect(useStreamStore.getState().streams).toHaveLength(0)
  })

  it('空文字はfalseを返す', () => {
    const result = useStreamStore.getState().addStream('')

    expect(result).toBe(false)
    expect(useStreamStore.getState().streams).toHaveLength(0)
  })

  it('removeStreamでストリームを削除できる', () => {
    useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
    const streamId = useStreamStore.getState().streams[0].id

    useStreamStore.getState().removeStream(streamId)

    expect(useStreamStore.getState().streams).toHaveLength(0)
  })

  it('updateStreamPositionで位置を更新できる', () => {
    useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
    const streamId = useStreamStore.getState().streams[0].id

    useStreamStore.getState().updateStreamPosition(streamId, 100, 200)

    const stream = useStreamStore.getState().streams[0]
    expect(stream.x).toBe(100)
    expect(stream.y).toBe(200)
  })

  it('updateStreamPositionは移動量を加算する', () => {
    useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
    const streamId = useStreamStore.getState().streams[0].id

    useStreamStore.getState().updateStreamPosition(streamId, 100, 200)
    useStreamStore.getState().updateStreamPosition(streamId, 50, -30)

    const stream = useStreamStore.getState().streams[0]
    expect(stream.x).toBe(150)
    expect(stream.y).toBe(170)
  })

  it('同じ動画を複数追加できる', () => {
    useStreamStore.getState().addStream('https://www.youtube.com/watch?v=same')
    useStreamStore.getState().addStream('https://www.youtube.com/watch?v=same')

    expect(useStreamStore.getState().streams).toHaveLength(2)
  })

  describe('applyAutoLayout', () => {
    it('自動レイアウトを適用すると各ストリームの位置とサイズが更新される', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test2')

      const containerWidth = 1200
      const containerHeight = 600
      useStreamStore.getState().applyAutoLayout(containerWidth, containerHeight)

      const streams = useStreamStore.getState().streams
      // 2つのストリームは横並び（2x1グリッド）
      expect(streams[0].x).toBe(0)
      expect(streams[0].y).toBe(0)
      expect(streams[0].width).toBe(600)
      expect(streams[0].height).toBe(600)

      expect(streams[1].x).toBe(600)
      expect(streams[1].y).toBe(0)
      expect(streams[1].width).toBe(600)
      expect(streams[1].height).toBe(600)
    })

    it('ストリームが0個の場合は何も起きない', () => {
      useStreamStore.getState().applyAutoLayout(1200, 600)

      expect(useStreamStore.getState().streams).toHaveLength(0)
    })

    it('4つのストリームは2x2グリッドに配置される', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test2')
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test3')
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test4')

      useStreamStore.getState().applyAutoLayout(1200, 600)

      const streams = useStreamStore.getState().streams
      // 2x2グリッド
      expect(streams[0]).toMatchObject({ x: 0, y: 0, width: 600, height: 300 })
      expect(streams[1]).toMatchObject({ x: 600, y: 0, width: 600, height: 300 })
      expect(streams[2]).toMatchObject({ x: 0, y: 300, width: 600, height: 300 })
      expect(streams[3]).toMatchObject({ x: 600, y: 300, width: 600, height: 300 })
    })

    it('ギャップを指定できる', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test2')

      const gap = 16
      useStreamStore.getState().applyAutoLayout(1200, 600, gap)

      const streams = useStreamStore.getState().streams
      // ギャップを考慮したサイズ
      const expectedWidth = (1200 - gap) / 2
      expect(streams[0].width).toBe(expectedWidth)
      expect(streams[1].x).toBe(expectedWidth + gap)
    })
  })

  describe('updateStreamSize', () => {
    it('ストリームのサイズを更新できる', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      const streamId = useStreamStore.getState().streams[0].id

      useStreamStore.getState().updateStreamSize(streamId, 800, 450)

      const stream = useStreamStore.getState().streams[0]
      expect(stream.width).toBe(800)
      expect(stream.height).toBe(450)
    })

    it('最小サイズ以下にはならない（幅200px、高さ150px）', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      const streamId = useStreamStore.getState().streams[0].id

      useStreamStore.getState().updateStreamSize(streamId, 100, 50)

      const stream = useStreamStore.getState().streams[0]
      expect(stream.width).toBe(200)
      expect(stream.height).toBe(150)
    })

    it('最大サイズ以上にはならない（幅1920px、高さ1080px）', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      const streamId = useStreamStore.getState().streams[0].id

      useStreamStore.getState().updateStreamSize(streamId, 3000, 2000)

      const stream = useStreamStore.getState().streams[0]
      expect(stream.width).toBe(1920)
      expect(stream.height).toBe(1080)
    })

    it('存在しないストリームIDでは何も起きない', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')

      useStreamStore.getState().updateStreamSize('non-existent-id', 800, 450)

      const stream = useStreamStore.getState().streams[0]
      expect(stream.width).toBeUndefined()
      expect(stream.height).toBeUndefined()
    })
  })

  describe('toggleMute', () => {
    it('isMuted=falseの場合、toggleMuteでtrueに変更される', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      const streamId = useStreamStore.getState().streams[0].id

      useStreamStore.getState().toggleMute(streamId)

      const stream = useStreamStore.getState().streams[0]
      expect(stream.isMuted).toBe(true)
    })

    it('isMuted=trueの場合、toggleMuteでfalseに変更される', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      const streamId = useStreamStore.getState().streams[0].id

      // 最初をmuteに設定
      useStreamStore.setState(state => ({
        streams: state.streams.map(s => ({ ...s, isMuted: true })),
      }))

      useStreamStore.getState().toggleMute(streamId)

      const stream = useStreamStore.getState().streams[0]
      expect(stream.isMuted).toBe(false)
    })

    it('複数ストリームがある場合、指定したストリームのみ切り替わる', () => {
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test1')
      useStreamStore.getState().addStream('https://www.youtube.com/watch?v=test2')

      const streamId1 = useStreamStore.getState().streams[0].id

      useStreamStore.getState().toggleMute(streamId1)

      const streams = useStreamStore.getState().streams
      expect(streams[0].isMuted).toBe(true)
      expect(streams[1].isMuted).toBeUndefined() // 変更されていない
    })
  })
})
