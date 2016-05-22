import { action, taskAction } from '../utils/actions'

const base = 'LIST_'

export const ITEM_ACTION = base + 'ITEM_ACTION'

export const PUSH = base + 'PUSH'
export function push(item) {
  return action(PUSH, item)
}

export const PUSH_NEW = base + 'PUSH_NEW'
export function pushNew() {
  return taskAction(PUSH_NEW)
}

export const CHANGE_NEW_VAL = base + 'CHANGE_VAL'
export function changeNewVal(field, value) {
  return action(CHANGE_NEW_VAL, {field, value})
}

export const REMOVE = base + 'REMOVE'
export function remove(idx) {
  return action(REMOVE, idx)
}
