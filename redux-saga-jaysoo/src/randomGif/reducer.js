import { NEW_GIF, PENDING } from './actions'
import Model from './model'

export const initialState = Model.Empty('cats')

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_GIF:
      return Model.Loaded(state.topic, action.payload)
    case PENDING:
      return Model.Pending(state.topic)
    default:
      return state
  }
}
