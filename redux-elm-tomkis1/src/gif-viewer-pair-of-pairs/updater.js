import { Updater, mapEffects, Matchers } from 'redux-elm';

import gifViewerPairUpdater, { init as gifViewerPairInit } from '../gif-viewer-pair/updater';

export function* init() {
  return {
    leftPair: yield* mapEffects(gifViewerPairInit(), 'LeftPair'),
    rightPair: yield* mapEffects(gifViewerPairInit(), 'RightPair')
  };
}

export default new Updater(init)
  .case('LeftPair', function*(model, action) {
    return {
      ...model,
      leftPair: yield* mapEffects(gifViewerPairUpdater(model.leftPair, action), 'LeftPair')
    };
  })
  .case('RightPair', function*(model, action) {
    return {
      ...model,
      rightPair: yield* mapEffects(gifViewerPairUpdater(model.rightPair, action), 'RightPair')
    };
  })
  .toReducer();