export function moveTo (
  right: boolean,
  totalLength: number,
  indexMap: [number, number, number],
  setIndexMap?: React.Dispatch<React.SetStateAction<[number, number, number]>>,
  currentSetMap?: (current: number, map: [number, number, number]) => [number, number, number]
) {
  let offset: number
  const target = indexMap[1]
  if (right) {
    if (target < totalLength - 1) {
      offset = target + 1
    } else {
      offset = 0
    }
  } else {
    if (target === 0) {
      offset = totalLength - 1
    } else {
      offset = target - 1
    }
  }

  setIndexMap && setIndexMap(currentSetMap && currentSetMap(offset, indexMap))
}