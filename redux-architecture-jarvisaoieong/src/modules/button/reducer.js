import {TOGGLE} from './actions';

export const initialState = false

export default (state = initialState, action) => {
  if (action.type === TOGGLE) {
    return !state;
  }
  return state;
}
