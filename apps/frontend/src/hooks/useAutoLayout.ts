export type TilePosition = {
  x: number
  y: number
  width: number
  height: number
}

export type LayoutConfig = {
  columns: number
  rows: number
  positions: TilePosition[]
}

/**
 * 動画数に応じた最適なグリッドの列数と行数を計算
 */
function getGridDimensions(count: number): { columns: number; rows: number } {
  if (count === 0) return { columns: 0, rows: 0 }
  if (count === 1) return { columns: 1, rows: 1 }
  if (count === 2) return { columns: 2, rows: 1 }
  if (count <= 4) return { columns: 2, rows: 2 }
  if (count <= 6) return { columns: 3, rows: 2 }
  if (count <= 9) return { columns: 3, rows: 3 }
  if (count <= 12) return { columns: 4, rows: 3 }
  // 12個以上は4列で行を増やす
  const columns = 4
  const rows = Math.ceil(count / columns)
  return { columns, rows }
}

/**
 * グリッドレイアウトを計算する
 * @param count 動画の数
 * @param containerWidth コンテナの幅
 * @param containerHeight コンテナの高さ
 * @param gap タイル間のギャップ（デフォルト: 0）
 */
export function calculateGridLayout(
  count: number,
  containerWidth: number,
  containerHeight: number,
  gap: number = 0
): LayoutConfig {
  const { columns, rows } = getGridDimensions(count)

  if (count === 0) {
    return { columns: 0, rows: 0, positions: [] }
  }

  // ギャップを考慮したタイルサイズの計算
  const totalGapWidth = columns > 1 ? gap * (columns - 1) : 0
  const totalGapHeight = rows > 1 ? gap * (rows - 1) : 0

  const tileWidth = (containerWidth - totalGapWidth) / columns
  const tileHeight = (containerHeight - totalGapHeight) / rows

  const positions: TilePosition[] = []

  for (let i = 0; i < count; i++) {
    const col = i % columns
    const row = Math.floor(i / columns)

    positions.push({
      x: col * (tileWidth + gap),
      y: row * (tileHeight + gap),
      width: tileWidth,
      height: tileHeight,
    })
  }

  return { columns, rows, positions }
}
