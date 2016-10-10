// @flow
import * as RandomGifPairModel from './random-gif-pair/model';

export type State = {
  randomGifPair: RandomGifPairModel.State,
};

export const initialState: State = {
  randomGifPair: RandomGifPairModel.initialState,
};

export type Action = {
  type: 'RandomGifPair',
  action: RandomGifPairModel.Action,
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
  case 'RandomGifPair':
    return {
      ...state,
      randomGifPair: RandomGifPairModel.reduce(state.randomGifPair, action.action),
    };
  default:
    return state;
  }
}
