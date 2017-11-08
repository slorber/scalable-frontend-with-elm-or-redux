import relocatableGif from '../relocatableGif/subscriber'

export default mountPoint => {
  const randomGifPair = relocatableGif(mountPoint, 2)

  return randomGifPair
}
