import { action } from '../utils/actions'
import cr from './render'

export const createRender = cr

export const wrapAction = (type, key, child) => action(type, {key, child}, Object.assign({wrapper: true}, child.meta))

export const overDisp = (type, key) => (disp) => (act) => disp( wrapAction(type, key, act) )

export const override = (type, key, comp) => {
  comp.override = overDisp(type, key)
  return comp
}

export function deepUnwrap(action) {
  while(action.meta && action.meta.wrapper === true)
    action = action.payload.child
  return action
}
