import update from 'react/lib/update'
import { combineReducers } from 'redux'
import * as randomGifPair from '../randomGifPair'
import { NEW_GIF, PENDING } from './actions'

export const initialState =
  { top: { [randomGifPair.name]: randomGifPair.initialState }
  , bottom: { [randomGifPair.name]: randomGifPair.initialState }
  }

export default (state = initialState, action) => {
  const { type, payload: { url, position } = {} } = action
  switch (type) {
    case NEW_GIF:
      return update(state, {
        [position.y]: {
          [randomGifPair.name]: {
            $set: randomGifPair.reducer(
              state[position.y][randomGifPair.name]
              ,
              randomGifPair.actions.newGif({ side: position.x, url })
            )
          }
        }
      })
    case PENDING:
      return update(state, {
        [position.y]: {
          [randomGifPair.name]: {
            $set: randomGifPair.reducer(
              state[position.y][randomGifPair.name]
              ,
              randomGifPair.actions.pending({ side: position.x })
            )
          }
        }
      })
    default:
      return state
  }
}