import './styles.css'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import * as main from './main'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware(main.saga)
const store = createStore(main.reducer, applyMiddleware(sagaMiddleware))

render(
  <Provider store={store}>
    <main.Container/>
  </Provider>
  ,
  document.getElementById('app')
)