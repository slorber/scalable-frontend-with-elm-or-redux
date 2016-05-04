import { metaStateReducer, metaTaskReducer } from '../utils/meta-reducers'
import * as A from './actions'
import * as m from './model'

const mtask  = metaTaskReducer(A.ITEM_ACTION, m.get)
const mstate = metaStateReducer(A.ITEM_ACTION, m.get, m.set)

export const makeTaskReducer  = (reducers, init) => {
  const item_action = mtask(reducers)
  return (dispatch, action, state) => {
    switch(action.type) {
      case A.ITEM_ACTION:
        return item_action(dispatch, action, state)

      case A.PUSH_NEW:
        return dispatch(A.push( init(m.getNew(state)) ))
    }
  }
}

export const makeStateReducer = (reducers) => {
  const item_action = mstate(reducers)
  return (state, action) => {
    switch(action.type) {
      case A.ITEM_ACTION:
        return item_action(state, action)

      case A.CHANGE_NEW_VAL: {
        const { field, value } = action.payload
        return m.setNewVal(state, field, value)
      }

      case A.PUSH:
        return m.push(state, action.payload)
      
      case A.REMOVE:
        return m.remove(state, action.payload)

      default:
        return state
    }
  }
}
