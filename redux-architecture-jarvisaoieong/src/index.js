import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import initialState from './initialState';
import App from 'containers/App';

const store = configureStore({initialState});

render(
  <Provider store={store}>
    <App />
  </Provider>
,
  document.getElementById('app')
);
