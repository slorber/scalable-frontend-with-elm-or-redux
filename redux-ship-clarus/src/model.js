// @flow
import * as ButtonModel from './button/model';
import * as CounterModel from './counter/model';
import * as RandomGifModel from './random-gif/model';
import * as RandomGifPairModel from './random-gif-pair/model';

export type State = {
  button: ButtonModel.State,
  counter: CounterModel.State,
  randomGif: RandomGifModel.State,
  randomGifPair: RandomGifPairModel.State,
};

export const initialState: State = {
  button: ButtonModel.initialState,
  counter: CounterModel.initialState,
  randomGif: RandomGifModel.initialState,
  randomGifPair: RandomGifPairModel.initialState,
};

export type Patch = {
  button?: ButtonModel.Patch,
  counter?: CounterModel.Patch,
  randomGif?: RandomGifModel.Patch,
  randomGifPair?: RandomGifPairModel.Patch,
};

export function reduce(state: State, patch: Patch): State {
  return {
    ...state,
    ...patch.button &&
      {button: ButtonModel.reduce(state.button, patch.button)},
    ...patch.counter &&
      {counter: CounterModel.reduce(state.counter, patch.counter)},
    ...patch.randomGif &&
      {randomGif: RandomGifModel.reduce(state.randomGif, patch.randomGif)},
    ...patch.randomGifPair &&
      {randomGifPair: RandomGifPairModel.reduce(state.randomGifPair, patch.randomGifPair)},
  };
}
