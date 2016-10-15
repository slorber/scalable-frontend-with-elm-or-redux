// @flow
import React from 'react';
import * as Test from '../test';
import * as RandomGifPairPairModel from './model';
import RandomGifPairPair from './view';

const defaultProps = {
  dispatch: Test.dispatch,
  state: RandomGifPairPairModel.initialState,
  tagsPair: {
    first: {
      first: 'cats',
      second: 'dogs',
    },
    second: {
      first: 'lemurs',
      second: 'minions',
    },
  },
};

Test.snapshotComponent(RandomGifPairPair, {
  'default': defaultProps,
});
