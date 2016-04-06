import { Updater, Matchers } from 'redux-elm';

export function increment(model) {
  return model + 1;
}

export function incrementByTwo(model) {
  if (model >= 10) {
    return model + 2;
  } else {
    return model + 1;
  }
}

export default new Updater(0)
  .toReducer();