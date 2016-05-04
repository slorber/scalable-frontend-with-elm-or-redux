import { taskAction, action } from '../utils/actions'

const base = 'BUTTON_'

export const TOGGLE = base + 'TOGGLE'
export function toggle() {
  return taskAction(TOGGLE)
}

export const SET = base + 'SET'
export function set(state) {
  return action(SET, state)
}
