// @flow
import * as Test from './test';
import * as Model from './model';

Test.snapshotReduce(Model.reduce, {
  button: {
    patch: {button: {type: 'Toggle'}},
    state: Model.initialState,
  },
  counter: {
    patch: {counter: {type: 'IncrementByOne'}},
    state: Model.initialState,
  },
  randomGif: {
    patch: {randomGif: {type: 'LoadStart'}},
    state: Model.initialState,
  },
  randomGifPair: {
    patch: {randomGifPair: {first: {type: 'LoadStart'}}},
    state: Model.initialState,
  },
  randomGifPairPair: {
    patch: {randomGifPairPair: {first: {second: {type: 'LoadStart'}}}},
    state: Model.initialState,
  },
});
