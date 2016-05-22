import { Updater } from 'redux-elm';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import gifViewerUpdater, { initialModel as gifViewerInitialModel } from '../gif-viewer-pair/updater';

export const initialModel = {
  leftPair: gifViewerInitialModel,
  rightPair: gifViewerInitialModel
};

export default new Updater(initialModel)
  .case('LeftPair', (model, action) =>
    ({ ...model, leftPair: gifViewerUpdater(model.leftPair, action) }))
  .case('RightPair', (model, action) =>
    ({ ...model, rightPair: gifViewerUpdater(model.rightPair, action) }))
  .toReducer();
