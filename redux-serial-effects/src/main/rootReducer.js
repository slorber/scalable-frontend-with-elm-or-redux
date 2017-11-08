import { combineReducers } from 'redux'
import counterReducer, { getValue as counterGetValue } from '../counter/reducer'
import buttonReducer, {
  getEnabledState as buttonGetEnabledState
} from '../button/reducer'
import relocatableGif from '../relocatableGif/reducer'
import randomGifPair from '../randomGifPair/reducer'
import randomGifPairOfPair from '../randomGifPairOfPair/reducer'
import mountPoints from './mountPoints'

const randomGif = relocatableGif(mountPoints.randomGif, 1)
const randomGifPairReducer = randomGifPair(mountPoints.randomGifPair)
const randomGifPairOfPairReducer = randomGifPairOfPair(
  mountPoints.randomGifPairOfPair
)

const rootReducer = combineReducers({
  [mountPoints.counter]: counterReducer,
  [mountPoints.button]: buttonReducer,
  [mountPoints.randomGif]: randomGif.reducer,
  [mountPoints.randomGifPair]: randomGifPairReducer.reducer,
  [mountPoints.randomGifPairOfPair]: randomGifPairOfPairReducer.reducer
})

const getCounterValue = state => counterGetValue(state.counter)
const getButtonEnabledState = state => buttonGetEnabledState(state.button)

export default rootReducer
export { getCounterValue, getButtonEnabledState }
