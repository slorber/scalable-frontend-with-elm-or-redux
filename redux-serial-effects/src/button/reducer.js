import { FLIP } from './actionTypes'

function reducer(state = false, action) {
  switch (action.type) {
    case FLIP:
      return !state
    default:
      return state
  }
}

const getEnabledState = state => state

export default reducer
export { getEnabledState }
