import { Updater, mapEffects, Matchers } from 'redux-elm';

import gifViewerUpdater, { init as gifViewerInit } from '../gif-viewer/updater';
import gifViewerPairUpdater, { init as gifViewerPairInit } from '../gif-viewer-pair/updater';
import gifViewerPairPairUpdater, { init as gifViewerPairPairInit } from '../gif-viewer-pair-of-pairs/updater';
import buttonUpdater, * as ButtonApi from '../button/updater';
import counterUpdater, * as CounterApi from '../counter/updater';

export function* init() {
  return {
    gifViewer: yield* mapEffects(gifViewerInit('funny cats')(), 'GifViewer'),
    gifViewerPair: yield* mapEffects(gifViewerPairInit(), 'GifViewerPair'),
    gifViewerPairPair: yield* mapEffects(gifViewerPairPairInit(), 'GifViewerPairPair'),
    button: yield* mapEffects(buttonUpdater(), 'Button'),
    counter: yield* mapEffects(counterUpdater(), 'Counter')
  };
}

const endsWithMatcher = pattern => action => {
  if (action.type.endsWith(pattern)) {
    return [ pattern ];
  } else {
    return false;
  }
}

export default new Updater(init)
  .case('GifViewer', function*(model, action) {
    return {
      ...model,
      gifViewer: yield* mapEffects(gifViewerUpdater(model.gifViewer, action), 'GifViewer')
    };
  })
  .case('GifViewerPair', function*(model, action) {
    return {
      ...model,
      gifViewerPair: yield* mapEffects(gifViewerPairUpdater(model.gifViewerPair, action), 'GifViewerPair')
    };
  })
  .case('GifViewerPairPair', function*(model, action) {
    return {
      ...model,
      gifViewerPairPair: yield* mapEffects(gifViewerPairPairUpdater(model.gifViewerPairPair, action), 'GifViewerPairPair')
    };
  })
  .case('Button', function*(model, action) {
    return {
      ...model,
      button: yield* mapEffects(buttonUpdater(model.button, action), 'Button')
    }
  })
  .case('NewGif', function*(model, action) {
    return {
      ...model,
      counter: ButtonApi.isActive(model.button) ?
        CounterApi.incrementByTwo(model.counter) :
        CounterApi.increment(model.counter)
    };
  }, endsWithMatcher)
  .toReducer();