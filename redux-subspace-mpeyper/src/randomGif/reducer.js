import { LOADING, SET_SRC } from './actions'

const initialState = { loading: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true}
    case SET_SRC:
      return { ...state, src: action.src, loading: false}
    default:
      return state
  }
}
