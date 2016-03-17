import { TOGGLE_BUTTON_STATE } from './actions';

export const initialState = {
  isActive: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_BUTTON_STATE:
      return {
        isActive: !state.isActive
      };
    default:
      return state;
  }
}
