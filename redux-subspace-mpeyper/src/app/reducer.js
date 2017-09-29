import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as randomGifReducer } from '../randomGif'
import { reducer as randomGifPairReducer } from '../randomGifPair'
import { reducer as randomGifPairPairReducer } from '../randomGifPairPair'
import { reducer as buttonReducer } from '../button'
import { reducer as counterReducer } from '../counter'

export default combineReducers({
  randomGif: namespaced('randomGif')(randomGifReducer),
  randomGifPair: namespaced('randomGifPair')(randomGifPairReducer),
  randomGifPairPair: namespaced('randomGifPairPair')(randomGifPairPairReducer),
  button: namespaced('button')(buttonReducer),
  counter: namespaced('counter')(counterReducer)
})
