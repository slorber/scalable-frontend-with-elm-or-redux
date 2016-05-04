import { override } from '../deku-override'
import { ITEM_ACTION } from './actions'

export default (key, Comp) => (...state) => {
  const comp = Comp(...state)
  override(ITEM_ACTION, key, comp)
  return comp
}
