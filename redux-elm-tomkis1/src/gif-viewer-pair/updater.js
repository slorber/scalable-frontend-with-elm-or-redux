import { Updater } from 'redux-elm';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import gifViewerUpdater, { init as gifViewerInit } from '../gif-viewer/updater';

export const initialModel = {
  top: gifViewerInit('funny cats'),
  bottom: gifViewerInit('funny dogs')
};

export default new Updater(initialModel)
  .case('Top', (model, action) =>
    ({ ...model, top: gifViewerUpdater(model.top, action) }))
  .case('Bottom', (model, action) =>
    ({ ...model, bottom: gifViewerUpdater(model.bottom, action) }))
  .toReducer();