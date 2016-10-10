// @flow
import * as Ship from 'redux-ship';
import * as Effect from './effect';
import * as RandomGifController from './random-gif/controller';
import * as RandomGifPairController from './random-gif-pair/controller';
import * as Model from './model';

export type Action = {
  type: 'RandomGif',
  action: RandomGifController.Action,
} | {
  type: 'RandomGifPair',
  action: RandomGifPairController.Action,
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
