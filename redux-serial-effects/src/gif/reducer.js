import { NEW_GIF, UPDATED } from './actionTypes'
import states from './states'

const reducer = (
  state = {
    state: 'INIT',
    topic: '',
    url: ''
  },
  action
) => {
  switch (action.type) {
    case NEW_GIF:
      return Object.assign({}, state, {
        state: states.request,
        topic: action.topic
      })
    case UPDATED:
      return Object.assign({}, state, { state: states.ready, url: action.url })
    default:
      return state
  }
}

const getState = state => state.state
const isRequesting = state => state.state === states.request

export default reducer
export { getState, isRequesting }
