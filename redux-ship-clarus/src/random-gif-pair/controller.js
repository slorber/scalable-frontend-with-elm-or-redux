// @flow
import * as Ship from 'redux-ship';
import * as RandomGifController from '../random-gif/controller';
import * as Model from './model';

export type Action = {
  type: 'First',
  action: RandomGifController.Action,
} | {
  type: 'Second',
  action: RandomGifController.Action,
};

export function* control(
  action: Action
): Ship.Ship<*, Model.Action, Model.State, void> {
  switch (action.type) {
  case 'First':
    return yield* Ship.map(
      action => ({type: 'First', action}),
      state => state.first,
      RandomGifController.control(action.action)
    );
  case 'Second':
    return yield* Ship.map(
      action => ({type: 'Second', action}),
      state => state.second,
      RandomGifController.control(action.action)
    );
  default:
    return;
  }
}
