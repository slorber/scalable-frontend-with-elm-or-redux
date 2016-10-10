// @flow
import * as RandomGifModel from './random-gif/model';

export type State = {
  randomGif: RandomGifModel.State,
};

export const initialState: State = {
  randomGif: RandomGifModel.initialState,
};

export type Action = {
  type: 'RandomGif',
  action: RandomGifModel.Action,
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
  case 'RandomGif':
    return {
      ...state,
      randomGif: RandomGifModel.reduce(state.randomGif, action.action),
    };
  default:
    return state;
  }
}
