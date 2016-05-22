import { makeStateReducer, makeTaskReducer } from '../pair/reducers'
import * as rnd from '../rndgif-pair/reducers'

export const taskReducer = makeTaskReducer( rnd.taskReducer )
export const stateReducer = makeStateReducer( rnd.stateReducer )
