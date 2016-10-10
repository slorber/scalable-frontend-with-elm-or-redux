// @flow
import * as Ship from 'redux-ship';
import * as Effect from '../effect';
import * as Model from './model';

export type Action = {
  type: 'Load',
  tag: string,
};

export function* control(
  action: Action
): Ship.Ship<Effect.Effect, Model.Action, Model.State, void> {
  switch (action.type) {
  case 'Load': {
    yield* Ship.dispatch({
      type: 'LoadStart',
    });
    const result = yield* Effect.httpRequest(
      `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${action.tag}`
    );
    const gifUrl: string = JSON.parse(result).data.image_url;
    yield* Ship.dispatch({
      type: 'LoadSuccess',
      gifUrl,
    });
    return;
  }
  default:
    return;
  }
}
