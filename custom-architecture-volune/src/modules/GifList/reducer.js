import Msg from './messages';

const DEFAULT_STATE = {
  newTopic: '',
  topics: [],
};

export default (state = DEFAULT_STATE, message) => {
  switch (message.type) {
    case Msg.NEW_TOPIC_CHANGED: {
      return {
        ...state,
        newTopic: message.newTopic,
      };
    }
    case Msg.TOPIC_ADDED: {
      return {
        ...state,
        newTopic: '',
        topics: [...state.topics, message.topic],
      };
    }
    default:
      return state;
  }
};
