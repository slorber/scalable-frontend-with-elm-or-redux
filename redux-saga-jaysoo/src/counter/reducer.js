import { INC, DEC } from './actions'
import Model from './model'

export const initialState = Model(0)

export default (state = initialState, action) => {
  switch (action.type) {
    case INC:
      return state + Model(1)
    case DEC:
      return state - Model(1)
    default:
      return state
  }
}
