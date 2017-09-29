import { TOGGLE } from '../button'
import { INCREMENT } from './actions'

const initialState = {
  useMultiplier: false,
  count: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return { ...state, useMultiplier: !state.useMultiplier }
    case INCREMENT: {
      const increment = state.count >= 10 && state.useMultiplier ? 2 : 1
      return { ...state, count: state.count + increment }
    }
    default:
      return state
  }
}
