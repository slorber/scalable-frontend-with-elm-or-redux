import './styles.css'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App, saga, reducer } from './main'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(reducer, 
    applyMiddleware(logger)
    );

render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('app')
)
