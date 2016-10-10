// @flow
import * as Ship from 'redux-ship';
import * as Effect from '../effect';
import * as CounterModel from '../counter/model';
import * as Model from './model';

export type Action = {
  type: 'Load',
  tag: string,
};

export type ModelAction = {
  type: 'RandomGif',
  action: Model.Action,
} | {
  type: 'Counter',
  action: CounterModel.Action,
};

export type ModelState = {
  counter: CounterModel.State,
  randomGif: Model.State,
};

function* incrementCounter() {
  const {count} = (yield* Ship.getState()).counter;
  if (count >= 10) {
    yield* Ship.dispatch({
      type: 'Counter',
      action: {
        type: 'IncrementByTwo',
      },
    });
  } else {
    yield* Ship.dispatch({
      type: 'Counter',
      action: {
        type: 'IncrementByOne',
      },
    });
  }
}

export function* control(
  action: Action
): Ship.Ship<Effect.Effect, ModelAction, ModelState, void> {
  switch (action.type) {
  case 'Load': {
    yield* Ship.dispatch({
      type: 'RandomGif',
      action: {
        type: 'LoadStart',
      },
    });
    const result = yield* Effect.httpRequest(
      `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${action.tag}`
    );
    const gifUrl: string = JSON.parse(result).data.image_url;
    yield* Ship.dispatch({
      type: 'RandomGif',
      action: {
        type: 'LoadSuccess',
        gifUrl,
      },
    });
    yield* incrementCounter();
    return;
  }
  default:
    return;
  }
}
