// @flow
import * as CounterModel from './counter/model';
import * as RandomGifModel from './random-gif/model';
import * as RandomGifPairModel from './random-gif-pair/model';

export type State = {
  counter: CounterModel.State,
  randomGif: RandomGifModel.State,
  randomGifPair: RandomGifPairModel.State,
};

export const initialState: State = {
  counter: CounterModel.initialState,
  randomGif: RandomGifModel.initialState,
  randomGifPair: RandomGifPairModel.initialState,
};

export type Action = {
  type: 'Counter',
  action: CounterModel.Action,
} | {
  type: 'RandomGif',
  action: RandomGifModel.Action,
} | {
  type: 'RandomGifPair',
  action: RandomGifPairModel.Action,
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
  case 'Counter':
    return {
      ...state,
      counter: CounterModel.reduce(state.counter, action.action),
    };
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
