import { TURN_ON, TURN_OFF } from './actions'
import Model from './model'

export const initialState = false

export default (state = initialState, action) => {
  switch (action.type) {
    case TURN_ON:
      return true
    case TURN_OFF:
      return false
    default:
      return state
  }
}
