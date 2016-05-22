import { deepUnwrap } from '../deku-override'
import { combineTaskReducers, combineStateReducers } from '../utils/combine-reducers'
import { incBy } from '../counter/actions'
import { NEW_GIF } from '../rndgif/actions'
import * as ctr from '../counter/reducers'
import * as btn from '../button/reducers'
import * as rnd from '../rndgif/reducers'
import * as lst from '../rndgif-list/reducers'
import * as rnp from '../rndgif-pair/reducers'
import * as rpp from '../rndgif-pair-pair/reducers'
import * as uniq from '../unique/reducers'
import * as A from './actions'
import { K, getCounter, btnIsActive } from './model'

export function observer(dispatch, action) {
  const orig = deepUnwrap(action)
  if(orig.type === NEW_GIF)
    dispatch( A.triggerCounter() )
}

function mainTaskReducer(dispatch, action, state) {
  if(action.type !== A.TRIGGER_COUNTER)
    return

  const c = getCounter(state)
  const b = btnIsActive(state)

  const inc = (c >= 10 && b === true) ? 2 : 1
  return dispatch( incBy(inc) )
}

export const taskReducer = combineTaskReducers({
  '': mainTaskReducer,
  [K.btn]: btn.taskReducer,
  [K.rnd]: rnd.taskReducer,
  [K.list]: lst.taskReducer,
  [K.uniq]: uniq.makeTaskReducer({
    [K.pair]: rnp.taskReducer,
    [K.pairPair]: rpp.taskReducer
  })
})

export const stateReducer = combineStateReducers({
  [K.btn]: btn.stateReducer,
  [K.ctr]: ctr.stateReducer,
  [K.rnd]: rnd.stateReducer,
  [K.list]: lst.stateReducer,
  [K.uniq]: uniq.makeStateReducer({
    [K.pair]: rnp.stateReducer,
    [K.pairPair]: rpp.stateReducer
  })
})
