import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as randomGifReducer } from '../randomGif'

export default combineReducers({
  randomGif1: namespaced('randomGif1')(randomGifReducer),
  randomGif2: namespaced('randomGif2')(randomGifReducer)
})
