import * as A from './actions'

export function stateReducer(state, action) {
  if(action.type === A.SET)
    return action.payload

  return state
}

export function taskReducer(dispatch, action, state) {
  if(action.type === A.TOGGLE)
    return dispatch( A.set(!state) )
}
