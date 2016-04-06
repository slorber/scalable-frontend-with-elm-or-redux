import React from 'react';
import { forwardTo } from 'redux-elm';

import GifViewer from '../gif-viewer/view';
import GifViewerPair from '../gif-viewer-pair/view';
import GifViewerPairPair from '../gif-viewer-pair-of-pairs/view';
import Button from '../button/view';
import Counter from '../counter/view';

export default ({ model, dispatch }) => (
  <div>
    <div style={{ float: 'left' }}>
      <h2>GifViewer</h2>
      <GifViewer model={model.gifViewer} dispatch={forwardTo(dispatch, 'GifViewer')} />
      <h2>GifViewer Pair</h2>
      <GifViewerPair model={model.gifViewerPair} dispatch={forwardTo(dispatch, 'GifViewerPair')} />
      <h2>GifViewer Pair of Pairs</h2>
      <GifViewerPairPair model={model.gifViewerPairPair} dispatch={forwardTo(dispatch, 'GifViewerPairPair')} />
    </div>
    <div style={{ float: 'left' }}>
      <Button model={model.button} dispatch={forwardTo(dispatch, 'Button')} />
      <Counter model={model.counter} dispatch={forwardTo(dispatch, 'Counter')} />
    </div>
  </div>
);