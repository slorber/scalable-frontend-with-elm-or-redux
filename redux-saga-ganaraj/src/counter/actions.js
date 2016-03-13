export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment = (selector) => {
  return {
    type: INCREMENT,
    selector
  }
}

export const decrement = (selector) => {
  return {
    type: DECREMENT,
    selector
  }
}
