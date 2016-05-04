import Pair from './component'
import { fst, snd } from './model'

export default (Comp) => (state) => {
  const one = Comp(fst(state))
  const two = Comp(snd(state))
  return Pair(one, two)
}
