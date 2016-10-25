import { take, put, select } from 'redux-saga/effects';
import moduxFactory from 'modux-js'

import { types as gifViewerTypes } from './gif-viewer';
import buttonModux, { types as buttonTypes } from './button';
import counterModux, { init as initCounter } from './counter';

export default moduxFactory(context => {
  context.add(counterModux, 'counter', initCounter(0))
  context.add(buttonModux, 'button')
  return {
    initSaga() {
      function *watchForNewGif() {
        while (true) {
          yield take(gifViewerTypes.RECEIVE_GIF)
          const isButtonActive = yield select(context.getSelectors('button').isActive)
          const counterValue = yield select(context.getSelectors('counter').getValue)
          const amount = counterValue >= 3 && isButtonActive ? 2 : 1
          yield put(context.getActions('counter').increment(amount))
        }
      }
      return watchForNewGif
    },
    initView() {
      return {
        Counter: context.getView('counter'),
        Button: context.getView('button')
      }
    }
  }
})
