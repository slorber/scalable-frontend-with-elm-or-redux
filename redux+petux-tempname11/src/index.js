/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { initEffects } from 'petux';
import { Provider, connect } from 'react-redux';

import App from './App/Component';
import appCreator from './App/reducer';
import PairOf from './Pair/Component';
import pairOf from './Pair/reducer';
import { handler } from './effects';

const { emit, enhancer: effectEnhancer } = initEffects(handler);
const enhancer = compose(
  effectEnhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__() :
    s => s,
);
const root = pairOf(appCreator)(emit);
const Root = PairOf('row', App);
const store = createStore(root.reducer, root.initial, enhancer);
const ConnectedApp = connect(state => ({ state }))(Root);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>,
  document.getElementById('root')
);
