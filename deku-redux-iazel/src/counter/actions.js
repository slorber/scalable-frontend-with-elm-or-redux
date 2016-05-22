import { action } from '../utils/actions'

export const INC = 'COUNTER_INC'
export function incBy(n) {
  return action(INC, n)
}
