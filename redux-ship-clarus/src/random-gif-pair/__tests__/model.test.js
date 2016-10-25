// @flow
import * as Test from '../../test';
import * as RandomGifPairModel from '../model';

Test.snapshotReduce(RandomGifPairModel.reduce, {
  first: {
    patch: {
      first: {type: 'LoadStart'},
    },
    state: RandomGifPairModel.initialState,
  },
  second: {
    patch: {
      second: {type: 'LoadStart'},
    },
    state: RandomGifPairModel.initialState,
  },
});
