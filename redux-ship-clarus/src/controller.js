// @flow
import * as Ship from 'redux-ship';
import * as Effect from './effect';
import * as RandomGifController from './random-gif/controller';
import * as Model from './model';

export type Action = {
  type: 'RandomGif',
  action: RandomGifController.Action,
};

export function* control(
  action: Action
): Ship.Ship<Effect.Effect, Model.Action, Model.State, void> {
  switch (action.type) {
  case 'RandomGif': {
    return yield* Ship.map(
      action => ({type: 'RandomGif', action}),
      state => state.randomGif,
      RandomGifController.control(action.action)
    );
  }
  default:
    return;
  }
}
