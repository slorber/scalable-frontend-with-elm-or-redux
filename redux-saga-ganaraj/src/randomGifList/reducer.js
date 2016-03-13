import { ADD_RANDOM_GIF, CHANGE_TOPIC } from './actions'
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
            count: 0,
            gifs: [],
            topic: ""
        },
      };
    case ADD_RANDOM_GIF:
      const count = state[action.selector].count++;
      const gifs = [
          ...state[action.selector].gifs,
          {
              selector: action.selector+count,
              topic: action.topic
          } 
        ];
      return {
        ...state,
        [action.selector]: {
            ...state[action.selector],
            count,
            gifs
        }
      };
    case CHANGE_TOPIC:
        return {
            ...state,
            [action.selector]: {
                ...state[action.selector],
                topic: action.topic
            }
        }
    default:
      return state;
  }
}
