import { REQUEST_NEW_GIF, NEW_GIF_SUCCESS } from './actions'

const initialState = {
    isPending: true,
    imageUrl: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEW_GIF:
      return {
          isPending: true,
          imageUrl: ""
        };
    case NEW_GIF_SUCCESS:
      return {
          isPending: false,
          imageUrl: action.imageUrl
        };
    default:
      return state;
  }
}
