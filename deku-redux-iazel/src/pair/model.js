import { List } from 'immutable'
import { get, set } from '../utils/meta-reducers'

const key = {
  ONE: 0,
  TWO: 1
}

const init = (one, two) => List([one, two])

const fst = (state) => get(state, key.ONE)
const snd = (state) => get(state, key.TWO)

export {
  fst,
  snd,
  get,
  set,
  key,
  init
}
