// @flow
import * as Ship from 'redux-ship';
import * as Effect from './effect';
import * as RandomGifPairController from './random-gif-pair/controller';
import * as Model from './model';

export type Action = {
  type: 'RandomGifPair',
  action: RandomGifPairController.Action,
};

export function* control(
  action: Action
): Ship.Ship<Effect.Effect, Model.Action, Model.State, void> {
  switch (action.type) {
  case 'RandomGifPair': {
    return yield* Ship.map(
      action => ({type: 'RandomGifPair', action}),
      state => state.randomGifPair,
      RandomGifPairController.control(action.action)
    );
  }
  default:
    return;
  }
}
