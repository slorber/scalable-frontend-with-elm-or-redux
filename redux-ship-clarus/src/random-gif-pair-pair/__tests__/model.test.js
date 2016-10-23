// @flow
import * as Test from '../../test';
import * as RandomGifPairPairModel from '../model';

Test.snapshotReduce(RandomGifPairPairModel.reduce, {
  firstSecond: {
    patch: {
      first: {second: {type: 'LoadStart'}},
    },
    state: RandomGifPairPairModel.initialState,
  },
  secondFirst: {
    patch: {
      second: {first: {type: 'LoadStart'}},
    },
    state: RandomGifPairPairModel.initialState,
  },
});
