import React from 'react';
import { view, forwardTo } from 'redux-elm';

import GifViewerPair from '../gif-viewer-pair/view';

export default view(({ model, dispatch }) => (
  <div>
    <div style={{ float: 'left' }}>
      <GifViewerPair model={model.leftPair} dispatch={forwardTo(dispatch, 'LeftPair')} />
    </div>
    <div style={{ float: 'left' }}>
      <GifViewerPair model={model.rightPair} dispatch={forwardTo(dispatch, 'RightPair')} />
    </div>
    <div style={{ clear: 'both' }}></div>
  </div>
));