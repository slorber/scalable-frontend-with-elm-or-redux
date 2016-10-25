import React from 'react'
import { connect } from 'react-redux'
import { put, call } from 'redux-saga/effects'
import moduxFactory from 'modux-js'

import gifViewerPairFactory, { init as initGifViewerPair } from '../gif-viewer-pair'

export const types = {
  LOAD_BOTH: 'modux-js-examples/gif-viewer-pair-pair/LOAD_BOTH'
}

export const init = ([left1, right1], [left2, right2]) => ({
  left: initGifViewerPair(left1, right1),
  right: initGifViewerPair(left2, right2)
})

const defaultInitialState = init(['aliens', 'babies'],['cars', 'planes'])

export default moduxFactory(context => {
  context.add(gifViewerPairFactory, 'left', context.getInitialState(defaultInitialState).left)
  context.add(gifViewerPairFactory, 'right', context.getInitialState(defaultInitialState).right)
  return {
    actions: {
      loadBoth() {
        return {
          type: types.LOAD_BOTH
        }
      }
    },
    initSaga({ takeLocal }) {
      function *loadBoth() {
        yield put(context.getActions('left').loadBoth())
        yield put(context.getActions('right').loadBoth())
      }

      function *watchForLoadBoth() {
        while (true) {
          yield takeLocal(types.LOAD_BOTH)
          yield call(loadBoth)
        }
      }

      return watchForLoadBoth
    },
    initView({ actions }) {
      const LeftGifViewerPair = context.getView('left')
      const RightGifViewerPair = context.getView('right')
      const GifViewerPairPair = ({ loadBoth }) => (
        <div style={{ border: '3px solid red' }}>
          <LeftGifViewerPair/>
          <RightGifViewerPair/>
          <p>
            <button onClick={loadBoth}>Load all of them !</button>
          </p>
        </div>
      )

      return connect(
        null,
        dispatch => ({
          loadBoth() {
            dispatch(actions.loadBoth())
          }
        })
      )(GifViewerPairPair)
    }
  }
})
