export const REQUEST_MORE = 'REQUEST_MORE';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const NEW_GIF = 'NEW_GIF';

export const requestMore = () => ({
  type: REQUEST_MORE,
});

export const requestError = (error) => ({
  type: REQUEST_ERROR,
  error,
});

export const newGif = (url) => ({
  type: NEW_GIF,
  url,
});
