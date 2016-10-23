// @flow
import React from 'react';
import * as Test from '../../test';
import * as ButtonModel from '../model';
import Button from '../view';

const defaultProps = {
  dispatch: Test.dispatch,
  state: ButtonModel.initialState,
};

Test.snapshotComponent(Button, {
  'default': defaultProps,
  disabled: {
    ...defaultProps,
    state: {
      ...defaultProps.state,
      status: 'red',
    },
  },
});
