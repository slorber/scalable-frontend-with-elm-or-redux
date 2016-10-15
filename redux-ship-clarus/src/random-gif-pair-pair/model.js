// @flow
import * as RandomGifPairModel from '../random-gif-pair/model';

export type State = {
  first: RandomGifPairModel.State,
  second: RandomGifPairModel.State,
};

export const initialState: State = {
  first: RandomGifPairModel.initialState,
  second: RandomGifPairModel.initialState,
};

export type Patch = {
  first?: RandomGifPairModel.Patch,
  second?: RandomGifPairModel.Patch,
};

export function reduce(state: State, patch: Patch): State {
  return {
    ...state,
    ...patch.first && {first: RandomGifPairModel.reduce(state.first, patch.first)},
    ...patch.second && {second: RandomGifPairModel.reduce(state.second, patch.second)},
  };
}
