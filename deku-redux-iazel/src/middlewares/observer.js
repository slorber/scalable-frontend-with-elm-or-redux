import { deepUnwrap } from '../deku-override'
import { NEW_GIF } from '../rndgif/actions'
import { triggerCounter } from '../main/actions'

export default (observer) => ({ dispatch }) => (next) => (action) => {
  observer(dispatch, action)
  return next(action)
}
