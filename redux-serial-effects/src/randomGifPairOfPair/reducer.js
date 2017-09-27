import relocatableGif from '../relocatableGif/reducer'

export default mountPoint => {
  const randomGifPair = relocatableGif(mountPoint, 4)

  return {
    reducer: randomGifPair.reducer,
    selectors: {
      getFirstGifState: (state, index) =>
        randomGifPair.selectors.getState(state.randomGifPair, 0),
      getSecondGifState: (state, index) =>
        randomGifPair.selectors.getState(state.randomGifPair, 1),
      getThirdGifState: (state, index) =>
        randomGifPair.selectors.getState(state.randomGifPair, 2),
      getFourthGifState: (state, index) =>
        randomGifPair.selectors.getState(state.randomGifPair, 3),
      isFirstGifRequesting: (state, index) =>
        randomGifPair.selectors.isRequesting(state.randomGifPair, 0),
      isSecondGifRequesting: (state, index) =>
        randomGifPair.selectors.isRequesting(state.randomGifPair, 1),
      isThirdGifRequesting: (state, index) =>
        randomGifPair.selectors.isRequesting(state.randomGifPair, 2),
      isFourthGifRequesting: (state, index) =>
        randomGifPair.selectors.isRequesting(state.randomGifPair, 3)
    }
  }
}
