import { INC } from './actions'

export function stateReducer(state, action) {
  if(action.type === INC)
    state += action.payload

  return state
}
