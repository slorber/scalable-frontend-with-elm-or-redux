export const REQUEST_NEW_GIF = 'REQUEST_NEW_GIF';
export const NEW_GIF_SUCCESS = 'NEW_GIF_SUCCESS';

export const requestNewGif = (topic) => {
  return {
    type: REQUEST_NEW_GIF,
    topic
  };
};

export const newGifSuccess = (imageUrl) => {
  return {
    type: NEW_GIF_SUCCESS,
    imageUrl
  };
}
