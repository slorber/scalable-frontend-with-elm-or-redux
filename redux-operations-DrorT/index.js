import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Counters from './containers/App'
import configureStore from './configureStore'
import DevTools from './DevTools';

const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <Counters />
      <DevTools/>
    </div>
  </Provider>,
document.getElementById('root')
)
