export const ADD_RANDOM_GIF = 'ADD_RANDOM_GIF';

export const addNewGif = (selector, topic) => {
  return {
    type: ADD_RANDOM_GIF,
    topic,
    selector
  };
};

export const CHANGE_TOPIC = 'CHANGE_TOPIC';

export const changeTopic = (selector, topic) => {
  return {
    type: CHANGE_TOPIC,
    topic,
    selector
  };
};
