// @flow
import React from 'react';
import * as Test from '../test';
import * as RandomGifPairModel from './model';
import RandomGifPair from './view';

const defaultProps = {
  dispatch: Test.dispatch,
  state: RandomGifPairModel.initialState,
  tags: {
    first: 'cats',
    second: 'dogs',
  },
};

Test.snapshotComponent(RandomGifPair, {
  'default': defaultProps,
});
