export const ADD_RANDOM_GIF = 'ADD_RANDOM_GIF';

export const addNewGif = (topic) => {
  return {
    type: ADD_RANDOM_GIF,
    topic
  };
};

export const CHANGE_TOPIC = 'CHANGE_TOPIC';

export const changeTopic = (topic) => {
  return {
    type: CHANGE_TOPIC,
    topic
  };
};
