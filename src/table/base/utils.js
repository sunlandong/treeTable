const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px'
}
export function measureScrollbar (direction = 'vertical') {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0
  }
  const isVertical = direction === 'vertical'

}
