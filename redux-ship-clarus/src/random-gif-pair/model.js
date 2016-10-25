// @flow
import * as RandomGifModel from '../random-gif/model';

export type State = {
  first: RandomGifModel.State,
  second: RandomGifModel.State,
};

export const initialState: State = {
  first: RandomGifModel.initialState,
  second: RandomGifModel.initialState,
};

export type Patch = {
  first?: RandomGifModel.Patch,
  second?: RandomGifModel.Patch,
};

export function reduce(state: State, patch: Patch): State {
  return {
    ...state,
    ...patch.first && {first: RandomGifModel.reduce(state.first, patch.first)},
    ...patch.second && {second: RandomGifModel.reduce(state.second, patch.second)},
  };
}
