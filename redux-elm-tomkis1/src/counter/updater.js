import { Updater } from 'redux-elm';

export const increment = model => model + 1;

export const incrementByTwo = model => {
  if (model >= 10) {
    return model + 2;
  } else {
    return model + 1;
  }
}

export const initialModel = 0;

export default new Updater(initialModel)
  .toReducer();