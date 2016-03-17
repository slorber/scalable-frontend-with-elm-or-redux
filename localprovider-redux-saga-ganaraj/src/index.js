import './styles.css'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App, reducer } from './main'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import saga from './saga';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware(saga)

const store = createStore(reducer, 
    applyMiddleware(sagaMiddleware, logger)
    );

render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('app')
)
