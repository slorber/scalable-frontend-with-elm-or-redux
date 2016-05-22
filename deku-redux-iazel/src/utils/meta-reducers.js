import { overDisp } from '../deku-override'

export const get = (state, key) => state.get(key)
export const set = (state, key, val) => state.set(key, val)

const id = (v) => v
export const metaStateReducer = (ACTION, get, set, getReducer = id) => (reducers) => (state, action) => {
  if(action.type !== ACTION)
    return state

  const { key, child } = action.payload
  const reduce = getReducer(reducers, key)
  return set(state, key, reduce(get(state, key), child))
}

export const metaTaskReducer = (ACTION, get, getReducer = id) => (reducers) => (dispatch, action, state) => {
  if(action.type !== ACTION)
    return

  const { key, child } = action.payload
  const reduce = getReducer(reducers, key)
  const disp = overDisp(ACTION, key)(dispatch)
  return reduce(disp, child, get(state, key))
}
