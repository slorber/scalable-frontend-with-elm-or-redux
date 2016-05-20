import { Updater } from 'redux-elm';

import gifViewerUpdater, { init as gifViewerInit } from '../gif-viewer/updater';
import gifViewerPairUpdater, { initialModel as gifViewerPairInitialModel } from '../gif-viewer-pair/updater';
import gifViewerPairPairUpdater, { initialModel as gifViewerPairPairInitialModel } from '../gif-viewer-pair-of-pairs/updater';
import buttonUpdater, * as ButtonApi from '../button/updater';
import counterUpdater, * as CounterApi from '../counter/updater';

const initialModel = {
  gifViewer: gifViewerInit('funny cats'),
  gifViewerPair: gifViewerPairInitialModel,
  gifViewerPairPair: gifViewerPairPairInitialModel,
  button: ButtonApi.initialModel,
  counter: CounterApi.initialModel
};

const endsWithMatcher = pattern => action => {
  if (action.type.endsWith(pattern)) {
    return {
      wrap: action.type.split(new RegExp('\\.' + pattern))[0],
      unwrap: pattern,
      args: {}
    };
  } else {
    return false;
  }
};

export default new Updater(initialModel)
  .case('GifViewer', (model, action) => ({ ...model, gifViewer: gifViewerUpdater(model.gifViewer, action) }))
  .case('GifViewerPair', (model, action) => ({ ...model, gifViewerPair: gifViewerPairUpdater(model.gifViewerPair, action) }))
  .case('GifViewerPairPair', (model, action) => ({ ...model, gifViewerPairPair: gifViewerPairPairUpdater(model.gifViewerPairPair, action) }))
  .case('Button', (model, action) => ({ ...model, button: buttonUpdater(model.button, action) }))
  .case('NewGif', (model, action) => ({
    ...model,
    counter: ButtonApi.isActive(model.button) ?
      CounterApi.incrementByTwo(model.counter) :
      CounterApi.increment(model.counter)
  }), endsWithMatcher)
  .toReducer();
