import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './helpers/createStore';
import {Main, reducer, init} from 'modules/main';

const store = createStore(reducer, init());

render(
  <Provider store={store}>
    <Main />
  </Provider>
,
  document.getElementById('app')
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('modules/main', () => {
    const {reducer: nextReducer} = require('modules/main');
    store.replaceReducer(nextReducer);
  });
}
