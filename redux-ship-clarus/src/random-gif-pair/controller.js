// @flow
import * as Ship from 'redux-ship';
import * as RandomGifController from '../random-gif/controller';
import * as CounterModel from '../counter/model';
import * as Model from './model';

export type Action = {
  type: 'First',
  action: RandomGifController.Action,
} | {
  type: 'Second',
  action: RandomGifController.Action,
};

export type ModelAction = {
  type: 'RandomGifPair',
  action: Model.Action,
} | {
  type: 'Counter',
  action: CounterModel.Action,
};

export type ModelState = {
  counter: CounterModel.State,
  randomGifPair: Model.State,
};

export function* control(
  action: Action
): Ship.Ship<*, ModelAction, ModelState, void> {
  switch (action.type) {
  case 'First':
    return yield* Ship.map(
      action => {
        switch (action.type) {
        case 'RandomGif':
          return {type: 'RandomGifPair', action: {type: 'First', action: action.action}};
        case 'Counter':
          return action;
        default:
          return action;
        }
      },
      state => ({
        counter: state.counter,
        randomGif: state.randomGifPair.first,
      }),
      RandomGifController.control(action.action)
    );
  case 'Second':
    return yield* Ship.map(
      action => {
        switch (action.type) {
        case 'RandomGif':
          return {type: 'RandomGifPair', action: {type: 'Second', action: action.action}};
        case 'Counter':
          return action;
        default:
          return action;
        }
      },
      state => ({
        counter: state.counter,
        randomGif: state.randomGifPair.second,
      }),
      RandomGifController.control(action.action)
    );
  default:
    return;
  }
}
