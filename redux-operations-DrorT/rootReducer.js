import { combineReducers } from 'redux'
import {counter} from './ducks/counter'
import {button} from './ducks/button'
import {randomGif} from './ducks/randomGif'
import {gifCounter} from './ducks/gifCounter'

export default combineReducers({
  counter,
  button,
  randomGif,
  gifCounter
});
