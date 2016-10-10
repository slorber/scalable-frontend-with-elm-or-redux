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

export type Action = {
  type: 'First',
  action: RandomGifModel.Action,
} | {
  type: 'Second',
  action: RandomGifModel.Action,
};

export function reduce(state: State, action: Action): State {
  switch (action.type) {
  case 'First':
    return {
      ...state,
      first: RandomGifModel.reduce(state.first, action.action),
    };
  case 'Second':
    return {
      ...state,
      second: RandomGifModel.reduce(state.second, action.action),
    };
  default:
    return state;
  }
}
