import {INIT_REDUX_OPERATIONS} from 'redux-operations';
import {UPDATE_GIF} from './randomGif'

export const gifCounter = (state = {counter:0, button:false}, action) => {
  if (action.type !== INIT_REDUX_OPERATIONS) return state;
  return {
    UPDATE_GIF: {
      priority: 10,
      resolve: (state = {counter:0, button:false}, action)=> {
        if ( ( state.counter >= 10 ) && ( state.button ) ) {
          return {...state, counter: state.counter+2};
        }
        else {
          return {...state, counter: state.counter+1};
        }
      }
    },
    signature: '@@reduxOperations'
  }
};

