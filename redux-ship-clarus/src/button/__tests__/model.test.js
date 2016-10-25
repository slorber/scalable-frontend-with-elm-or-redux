// @flow
import * as Test from '../../test';
import * as ButtonModel from '../model';

Test.snapshotReduce(ButtonModel.reduce, {
  activate: {
    patch: {type: 'Toggle'},
    state: {
      ...ButtonModel.initialState,
      status: 'red',
    },
  },
  desactivate: {
    patch: {type: 'Toggle'},
    state: ButtonModel.initialState,
  },
});
