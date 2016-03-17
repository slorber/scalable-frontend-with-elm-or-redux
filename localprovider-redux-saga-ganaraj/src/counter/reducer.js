import { INCREMENT, DECREMENT } from './actions';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state+1;
    case DECREMENT:
    return state-1;
    default:
      return state;
  }
}
