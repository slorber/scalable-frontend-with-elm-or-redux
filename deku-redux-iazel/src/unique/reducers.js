import { metaStateReducer, metaTaskReducer } from '../utils/meta-reducers'
import { ITEM_ACTION } from './actions'
import { get, set } from './model'

const getReducer = (reducers, key) => reducers[key]
export const makeTaskReducer   = metaTaskReducer(ITEM_ACTION, get, getReducer)
export const makeStateReducer = metaStateReducer(ITEM_ACTION, get, set, getReducer)
