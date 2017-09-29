import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as randomGifPairReducer } from '../randomGifPair'

export default combineReducers({
  randomGifPair1: namespaced('randomGifPair1')(randomGifPairReducer),
  randomGifPair2: namespaced('randomGifPair2')(randomGifPairReducer)
})
