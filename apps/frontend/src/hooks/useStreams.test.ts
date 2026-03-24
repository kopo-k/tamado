import { renderHook, act } from '@testing-library/react'
import { useStreams } from './useStreams'

describe('useStreams', () => {
  it('初期状態でstreamsは空配列', () => {
    const { result } = renderHook(() => useStreams())
    expect(result.current.streams).toEqual([])
  })

  it('addStreamでストリームを追加できる', () => {
    const { result } = renderHook(() => useStreams())

    act(() => {
      result.current.addStream({
        platform: 'youtube',
        videoId: 'YIFDiECQUe8',
        embedUrl: 'https://www.youtube.com/embed/YIFDiECQUe8',
      })
    })

    expect(result.current.streams).toHaveLength(1)
    expect(result.current.streams[0].platform).toBe('youtube')
    expect(result.current.streams[0].videoId).toBe('YIFDiECQUe8')
    expect(result.current.streams[0].id).toBeDefined()
  })

  it('removeStreamでストリームを削除できる', () => {
    const { result } = renderHook(() => useStreams())

    act(() => {
      result.current.addStream({
        platform: 'youtube',
        videoId: 'test1',
        embedUrl: 'https://www.youtube.com/embed/test1',
      })
    })

    const streamId = result.current.streams[0].id

    act(() => {
      result.current.removeStream(streamId)
    })

    expect(result.current.streams).toHaveLength(0)
  })

  it('複数のストリームを追加できる', () => {
    const { result } = renderHook(() => useStreams())

    act(() => {
      result.current.addStream({
        platform: 'youtube',
        videoId: 'test1',
        embedUrl: 'https://www.youtube.com/embed/test1',
      })
      result.current.addStream({
        platform: 'twitch',
        videoId: 'channel1',
        embedUrl: 'https://player.twitch.tv/?channel=channel1&parent=localhost',
      })
    })

    expect(result.current.streams).toHaveLength(2)
    expect(result.current.streams[0].platform).toBe('youtube')
    expect(result.current.streams[1].platform).toBe('twitch')
  })

  it('同じvideoIdのストリームを複数追加できる', () => {
    const { result } = renderHook(() => useStreams())

    act(() => {
      result.current.addStream({
        platform: 'youtube',
        videoId: 'same',
        embedUrl: 'https://www.youtube.com/embed/same',
      })
      result.current.addStream({
        platform: 'youtube',
        videoId: 'same',
        embedUrl: 'https://www.youtube.com/embed/same',
      })
    })

    expect(result.current.streams).toHaveLength(2)
  })
})
