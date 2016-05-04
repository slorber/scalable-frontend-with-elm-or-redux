import { taskAction } from '../utils/actions'

export const TRIGGER_COUNTER = 'MAIN_TRIGGER_COUNTER'
export function triggerCounter() {
  return taskAction(TRIGGER_COUNTER)
}
