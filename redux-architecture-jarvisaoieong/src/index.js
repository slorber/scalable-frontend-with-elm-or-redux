import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import {Main} from 'modules/main';

const store = configureStore();

render(
  <Provider store={store}>
    <Main />
  </Provider>
,
  document.getElementById('app')
);
