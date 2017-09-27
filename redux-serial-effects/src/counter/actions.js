import { INC, DEC } from './actionTypes'

function inc(by) {
  return { type: INC, by }
}

function dec(by) {
  return { type: DEC, by }
}

export { inc, dec }
