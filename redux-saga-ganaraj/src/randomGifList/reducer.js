import { ADD_RANDOM_GIF, CHANGE_TOPIC } from './actions'

const initialState = {
    count: 0,
    gifTopic:[],
    currentTopic: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RANDOM_GIF:
      const count = state.count++;
      return {
        currentTopic: state.currentTopic,
        count,
        gifTopic: [...state.gifTopic, action.topic]
      };
    case CHANGE_TOPIC:
        return {
            ...state,
            currentTopic: action.topic
        }
    default:
      return state;
  }
};
