import { describe, it, expect } from 'vitest'
import { calculateGridLayout } from './useAutoLayout'

describe('calculateGridLayout', () => {
  const containerWidth = 1200
  const containerHeight = 600

  describe('動画数に応じたグリッド計算', () => {
    it('動画1個の場合、1x1グリッドで全画面表示', () => {
      const result = calculateGridLayout(1, containerWidth, containerHeight)

      expect(result.columns).toBe(1)
      expect(result.rows).toBe(1)
      expect(result.positions).toHaveLength(1)
      expect(result.positions[0]).toEqual({
        x: 0,
        y: 0,
        width: containerWidth,
        height: containerHeight,
      })
    })

    it('動画2個の場合、2x1グリッドで横並び', () => {
      const result = calculateGridLayout(2, containerWidth, containerHeight)

      expect(result.columns).toBe(2)
      expect(result.rows).toBe(1)
      expect(result.positions).toHaveLength(2)

      const tileWidth = containerWidth / 2
      expect(result.positions[0]).toEqual({
        x: 0,
        y: 0,
        width: tileWidth,
        height: containerHeight,
      })
      expect(result.positions[1]).toEqual({
        x: tileWidth,
        y: 0,
        width: tileWidth,
        height: containerHeight,
      })
    })

    it('動画3個の場合、2x2グリッドで配置', () => {
      const result = calculateGridLayout(3, containerWidth, containerHeight)

      expect(result.columns).toBe(2)
      expect(result.rows).toBe(2)
      expect(result.positions).toHaveLength(3)
    })

    it('動画4個の場合、2x2グリッド', () => {
      const result = calculateGridLayout(4, containerWidth, containerHeight)

      expect(result.columns).toBe(2)
      expect(result.rows).toBe(2)
      expect(result.positions).toHaveLength(4)

      const tileWidth = containerWidth / 2
      const tileHeight = containerHeight / 2

      expect(result.positions[0]).toEqual({
        x: 0,
        y: 0,
        width: tileWidth,
        height: tileHeight,
      })
      expect(result.positions[3]).toEqual({
        x: tileWidth,
        y: tileHeight,
        width: tileWidth,
        height: tileHeight,
      })
    })

    it('動画5-6個の場合、3x2グリッド', () => {
      const result5 = calculateGridLayout(5, containerWidth, containerHeight)
      const result6 = calculateGridLayout(6, containerWidth, containerHeight)

      expect(result5.columns).toBe(3)
      expect(result5.rows).toBe(2)
      expect(result5.positions).toHaveLength(5)

      expect(result6.columns).toBe(3)
      expect(result6.rows).toBe(2)
      expect(result6.positions).toHaveLength(6)
    })

    it('動画7-9個の場合、3x3グリッド', () => {
      const result7 = calculateGridLayout(7, containerWidth, containerHeight)
      const result9 = calculateGridLayout(9, containerWidth, containerHeight)

      expect(result7.columns).toBe(3)
      expect(result7.rows).toBe(3)
      expect(result7.positions).toHaveLength(7)

      expect(result9.columns).toBe(3)
      expect(result9.rows).toBe(3)
      expect(result9.positions).toHaveLength(9)
    })

    it('動画10-12個の場合、4x3グリッド', () => {
      const result10 = calculateGridLayout(10, containerWidth, containerHeight)
      const result12 = calculateGridLayout(12, containerWidth, containerHeight)

      expect(result10.columns).toBe(4)
      expect(result10.rows).toBe(3)
      expect(result10.positions).toHaveLength(10)

      expect(result12.columns).toBe(4)
      expect(result12.rows).toBe(3)
      expect(result12.positions).toHaveLength(12)
    })
  })

  describe('エッジケース', () => {
    it('動画0個の場合、空の配列を返す', () => {
      const result = calculateGridLayout(0, containerWidth, containerHeight)

      expect(result.columns).toBe(0)
      expect(result.rows).toBe(0)
      expect(result.positions).toHaveLength(0)
    })

    it('コンテナサイズが0の場合でもエラーにならない', () => {
      const result = calculateGridLayout(4, 0, 0)

      expect(result.columns).toBe(2)
      expect(result.rows).toBe(2)
      expect(result.positions).toHaveLength(4)
    })
  })

  describe('ギャップ（余白）の考慮', () => {
    it('ギャップを指定するとタイルサイズが調整される', () => {
      const gap = 16
      const result = calculateGridLayout(4, containerWidth, containerHeight, gap)

      const expectedTileWidth = (containerWidth - gap) / 2
      const expectedTileHeight = (containerHeight - gap) / 2

      expect(result.positions[0].width).toBe(expectedTileWidth)
      expect(result.positions[0].height).toBe(expectedTileHeight)

      // 2番目のタイルはギャップ分ずれている
      expect(result.positions[1].x).toBe(expectedTileWidth + gap)
    })
  })
})
