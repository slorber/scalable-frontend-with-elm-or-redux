import update from 'react/lib/update'
import { combineReducers } from 'redux'
import * as randomGif from '../randomGif'
import { NEW_GIF, PENDING } from './actions'

export const initialState =
  { left: { [randomGif.name]: randomGif.Model.Empty('futurama') }
  , right: { [randomGif.name]: randomGif.Model.Empty('adventure time') }
  }

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case NEW_GIF:
      return update(state, {
        [payload.side]: {
          [randomGif.name]: {
            $set: randomGif.reducer( state[payload.side][randomGif.name]
                                   , randomGif.actions.newGif(payload.url)
            )
          }
        }
      })
    case PENDING:
      return update(state, {
        [payload.side]: {
          [randomGif.name]: {
            $set: randomGif.reducer( state[payload.side][randomGif.name]
                                   , randomGif.actions.pending()
            )
          }
        }
      })
    default:
      return state
  }
}