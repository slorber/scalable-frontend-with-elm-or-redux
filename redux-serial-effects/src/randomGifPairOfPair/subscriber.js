import relocatableGif from '../relocatableGif/subscriber'

export default mountPoint => {
  const randomGifPairOfPair = relocatableGif(mountPoint, 4)

  return randomGifPairOfPair
}
