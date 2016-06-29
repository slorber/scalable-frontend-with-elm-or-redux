import Msg from './messages';

const DEFAULT_STATE = {
  url: '/assets/loading.gif',
};

export default (state = DEFAULT_STATE, message) => {
  switch (message.type) {
    case Msg.GIF_RECEIVED: {
      return {
        ...state,
        url: message.url,
      };
    }
    default:
      return state;
  }
};
