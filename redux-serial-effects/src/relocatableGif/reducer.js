import gifReducer, {
  getState as gifGetState,
  isRequesting as gifIsRequesting
} from '../gif/reducer'

import encapsulate from '../encapsulateComponent'

export default (mountPoint, times) => {
  const encapsulated = encapsulate(times, mountPoint)

  return {
    reducer: encapsulated.reducer(gifReducer),
    selectors: {
      getState: (state, index) => gifGetState(state[index]),
      isRequesting: (state, index) => gifIsRequesting(state[index])
    }
  }
}
