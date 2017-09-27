import relocatableGif from '../relocatableGif/reducer'

export default mountPoint => {
  const randomGifPair = relocatableGif(mountPoint, 2)

  return {
    reducer: randomGifPair.reducer,
    selectors: {
      getFirstGifState: (state, index) =>
        randomGifPair.selectors.getState(state.randomGifPair, 0),
      getSecondGifState: (state, index) =>
        randomGifPair.selectors.getState(state.randomGifPair, 1),
      isFirstGifRequesting: (state, index) =>
        randomGifPair.selectors.isRequesting(state.randomGifPair, 0),
      isSecondGifRequesting: (state, index) =>
        randomGifPair.selectors.isRequesting(state.randomGifPair, 1)
    }
  }
}
