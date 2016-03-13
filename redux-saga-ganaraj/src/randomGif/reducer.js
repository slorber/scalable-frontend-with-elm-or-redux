import { REQUEST_NEW_GIF, NEW_GIF_SUCCESS } from './actions'
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
          isPending: true,
          imageUrl : ""
        }
      };
    case REQUEST_NEW_GIF:
      return {
        ...state,
        [action.selector]: {
          isPending: true,
          imageUrl: ""
        }
      };
    case NEW_GIF_SUCCESS:
      return {
        ...state,
        [action.selector]: {
          isPending: false,
          imageUrl: action.imageUrl
        }
      };
    default:
      return state;
  }
}
