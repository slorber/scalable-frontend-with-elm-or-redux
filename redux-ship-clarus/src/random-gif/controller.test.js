// @flow
import * as Test from '../test';
import * as RandomGifController from './controller';
import * as ButtonModel from '../button/model';
import * as CounterModel from '../counter/model';
import * as RandomGifModel from './model';

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
