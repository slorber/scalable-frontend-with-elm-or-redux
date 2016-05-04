import { init } from '../rndgif/model'
import { makeTaskReducer, makeStateReducer } from '../list/reducers'
import * as r from '../rndgif/reducers'

const initFields = (fields) => init(fields.get('topic'))

export const taskReducer  = makeTaskReducer(r.taskReducer, initFields)
export const stateReducer = makeStateReducer(r.stateReducer)
