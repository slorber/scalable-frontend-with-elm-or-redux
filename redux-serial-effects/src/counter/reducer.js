import { INC, DEC } from './actionTypes'

function reducer(state = 0, action) {
  switch (action.type) {
    case INC:
      return state + action.by
    case DEC:
      return state > action.by ? state - action.by : 0
    default:
      return state
  }
}

const getValue = state => state

export default reducer
export { getValue }
