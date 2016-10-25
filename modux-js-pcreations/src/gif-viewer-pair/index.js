import React from 'react'
import { connect } from 'react-redux'
import { put, call } from 'redux-saga/effects'
import moduxFactory from 'modux-js'

import gifViewerFactory, { init as initGifViewer } from '../gif-viewer'

export const types = {
  LOAD_BOTH: 'modux-js-examples/gif-viewer-pair/LOAD_BOTH'
}

export const init = (left, right) => ({
  left: initGifViewer(left),
  right: initGifViewer(right)
})

const defaultInitialState = init('simpson','southpark')

export default moduxFactory(context => {
  context.add(gifViewerFactory, 'left', context.getInitialState(defaultInitialState).left)
  context.add(gifViewerFactory, 'right', context.getInitialState(defaultInitialState).right)
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
        yield put(context.getActions('left').requestMore())
        yield put(context.getActions('right').requestMore())
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
      const LeftGifViewer = context.getView('left')
      const RightGifViewer = context.getView('right')
      const GifViewerPair = ({ loadBoth }) => (
        <div style={{ border: '2px solid black', width: '500px', display: 'inline-block' }}>
          <LeftGifViewer/>
          <RightGifViewer/>
          <p style={{ textAlign: 'center' }}>
            <button onClick={loadBoth}>Load both !</button>
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
      )(GifViewerPair)
    }
  }
})
