import {INC, DEC} from './actions';

export const initialState = 0;

export default (state = initialState, action) => {
  if (action.type === INC) {
    return state + action.value;
  }

  if (action.type === DEC) {
    return state - action.value;
  }

  return state;
}
