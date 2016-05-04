import { metaStateReducer, metaTaskReducer } from '../utils/meta-reducers'
import { ITEM_ACTION } from './actions'
import { get, set } from './model'

export const makeTaskReducer  = metaTaskReducer(ITEM_ACTION, get)
export const makeStateReducer = metaStateReducer(ITEM_ACTION, get, set)
