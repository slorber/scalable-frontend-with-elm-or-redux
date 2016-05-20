import React from 'react';
import { forwardTo, view } from 'redux-elm';

import GifViewer from '../gif-viewer/view';

export default view(({ model, dispatch }) => (
  <div>
    <GifViewer model={model.top} dispatch={forwardTo(dispatch, 'Top')} />
    <GifViewer model={model.bottom} dispatch={forwardTo(dispatch, 'Bottom')} />
  </div>
));
