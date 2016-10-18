import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import createLogger from 'redux-logger'

import root from './root'
import DevTools from './DevTools'
import sagaMonitor from './sagaMonitor'


const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

function *rootSaga() {
  yield [
    fork(root.saga)
  ]
}


export default function configureStore(initialState) {

    const store = createStore(
      root.reducer,
      initialState,
      compose(
        applyMiddleware(
          sagaMiddleware,
          createLogger()
        ),
        DevTools.instrument()
      )
    )

    sagaMiddleware.run(rootSaga)

    return store
}
