// @flow
import * as RandomGifModel from './random-gif/model';
import * as RandomGifPairModel from './random-gif-pair/model';

export type State = {
  randomGif: RandomGifModel.State,
  randomGifPair: RandomGifPairModel.State,
};

export const initialState: State = {
  randomGif: RandomGifModel.initialState,
  randomGifPair: RandomGifPairModel.initialState,
};

export type Action = {
  type: 'RandomGif',
  action: RandomGifModel.Action,
} | {
  type: 'RandomGifPair',
  action: RandomGifPairModel.Action,
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
  case 'RandomGif':
    return {
      ...state,
      randomGif: RandomGifModel.reduce(state.randomGif, action.action),
    };
  case 'RandomGifPair':
    return {
      ...state,
      randomGifPair: RandomGifPairModel.reduce(state.randomGifPair, action.action),
    };
  default:
    return state;
  }
}
