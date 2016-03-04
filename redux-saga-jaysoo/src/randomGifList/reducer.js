import update from 'react/lib/update'
import { combineReducers } from 'redux'
import * as randomGif from '../randomGif'
import { ADD, CHANGE_TOPIC, NEW_GIF, PENDING } from './actions'

export const initialState =
  { topic: 'simpsons'
  , gifs: []
  }

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD:
      return update(state, {
        gifs: {
          $push: [
            { id: state.gifs.length
            , [randomGif.name]: randomGif.Model.Empty(payload.topic)
            }
          ]
        }
      })
    case CHANGE_TOPIC:
      return update(state, {
        topic: { $set: payload.topic }
      })
    case NEW_GIF:
      return update(state, {
        gifs: {
          [payload.id]: {
            [randomGif.name]: {
              $set: randomGif.reducer( state.gifs[payload.id][randomGif.name]
                                     , randomGif.actions.newGif(payload.url)
              )
            }
          }
        }
      })
    case PENDING:
      return update(state, {
        gifs: {
          [payload.id]: {
            [randomGif.name]: {
              $set: randomGif.reducer( state.gifs[payload.id][randomGif.name]
                                     , randomGif.actions.pending()
              )
            }
          }
        }
      })
    default:
      return state
  }
}