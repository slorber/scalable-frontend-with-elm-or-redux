import { makeStateReducer, makeTaskReducer } from '../pair/reducers'
import * as rnd from '../rndgif/reducers'

export const taskReducer = makeTaskReducer( rnd.taskReducer )
export const stateReducer = makeStateReducer( rnd.stateReducer )
