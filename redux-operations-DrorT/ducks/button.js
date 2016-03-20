import {INIT_REDUX_OPERATIONS} from 'redux-operations';
import {UPDATE_GIF} from './randomGif'
export const CLICK_BUTTON = 'CLICK_BUTTON'

export function clickButton(location, name) {
  return {
    type: CLICK_BUTTON,
    meta: {location, name}
  }
}

// state represent if button is clicked
export const button = (state = false, action) => {
  if (action.type !== INIT_REDUX_OPERATIONS) return state;
  return {
    CLICK_BUTTON: {
      resolve: (state = false, action)=> !state
    },
    UPDATE_GIF:{
      priority: 5,
      resolve: (state = false, action)=> state
    },
    signature: '@@reduxOperations'
  }
};

