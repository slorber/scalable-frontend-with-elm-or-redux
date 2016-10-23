// @flow
import * as Test from '../../test';
import * as Effect from '../../effect';
import * as RandomGifController from '../controller';
import * as ButtonModel from '../../button/model';
import * as CounterModel from '../../counter/model';
import * as RandomGifModel from '../model';

const defaultState = {
  button: ButtonModel.initialState,
  counter: CounterModel.initialState,
  randomGif: RandomGifModel.initialState,
};

Test.snapshotApplyCommit(RandomGifController.applyCommit, {
  LoadStart: {
    commit: {type: 'LoadStart'},
    state: defaultState,
  },
  LoadSuccessIncrementByOne: {
    commit: {
      type: 'LoadSuccess',
      gifUrl: 'https://media2.giphy.com/media/m7ychnf9zOVm8/giphy.gif',
    },
    state: defaultState,
  },
  LoadSuccessIncrementByTwo: {
    commit: {
      type: 'LoadSuccess',
      gifUrl: 'https://media2.giphy.com/media/m7ychnf9zOVm8/giphy.gif',
    },
    state: {
      ...defaultState,
      counter: {
        ...defaultState.counter,
        count: 10,
      },
    },
  },
});

function reduce(
  state: RandomGifController.State,
  patch: RandomGifController.Patch
): RandomGifController.State {
  return {
    ...state,
    ...patch.counter &&
      {counter: CounterModel.reduce(state.counter, patch.counter)},
    ...patch.randomGif &&
      {randomGif: RandomGifModel.reduce(state.randomGif, patch.randomGif)},
  };
}

function runEffect(effect: Effect.Effect): any {
  switch (effect.type) {
  case 'HttpRequest':
    return JSON.stringify({
      data: {
        image_url: 'https://media2.giphy.com/media/m7ychnf9zOVm8/giphy.gif',
      },
    });
  default:
    return;
  }
}

Test.snapshotControl(
  RandomGifController.control,
  RandomGifController.applyCommit,
  reduce,
  {
    Load: {
      action: {
        type: 'Load',
        tag: 'cats',
      },
      runEffect,
      state: defaultState,
    },
  }
);
