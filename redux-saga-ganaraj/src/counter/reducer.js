import { INCREMENT, DECREMENT } from './actions'
import {
  INITIALISE_COMPONENT_STATE,
  REMOVE_COMPONENT_STATE
} from '../localState';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALISE_COMPONENT_STATE:
    case REMOVE_COMPONENT_STATE:
      return {
        ...state,
        [action.selector]: {
          ...state,
          count: 0
        }
      };
    case INCREMENT:
      return {
        ...state,
        [action.selector]: {
          count: state[action.selector].count + 1
        }
      };
    case DECREMENT:
    return {
      ...state,
      [action.selector]: {
        count: state[action.selector].count - 1
      }
    };
    default:
      return state
  }
}
