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
})
