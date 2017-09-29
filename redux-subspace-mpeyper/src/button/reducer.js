import { TOGGLE } from './actions'

const initialState = { toggled: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return { ...state, toggled: !state.toggled }
    default:
      return state
  }
}
