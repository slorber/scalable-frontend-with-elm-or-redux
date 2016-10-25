import React from 'react'
import { take, put, call, fork, select } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { connect } from 'react-redux'
import moduxFactory from 'modux-js'

import { fetchGif } from './effects'

export const types = {
  REQUEST_MORE: 'modux-js-examples/gif-viewer/REQUEST_MORE',
  RECEIVE_GIF: 'modux-js-examples/gif-viewer/RECEIVE_GIF'
}
export const init = (topic) => ({
  url: null,
  topic
})

const defaultInitialState = init('funny cats')

export default moduxFactory(context => ({
  actions: {
    requestMore: () => ({
      type: types.REQUEST_MORE,
    }),
    receiveGif: (gif) => ({
      type: types.RECEIVE_GIF,
      payload: { gif }
    })
  },
  selectors: {
    getUrl(state) {
      return state.url
    },
    getTopic(state) {
      return state.topic
    }
  },
  initReducer(initialState = defaultInitialState) {
    const url = (url = initialState.url, action = {}) => {
      switch (action.type) {
        case types.REQUEST_MORE:
          return null
        case types.RECEIVE_GIF:
          return action.payload.gif
        default:
          return url
      }
    }

    const topic = (topic = initialState.topic) => topic  // not mutable

    return combineReducers({
      url,
      topic
    })
  },
  initSaga({ takeLocal, selectors, actions }) {
    function *requestMoreSaga(topic) {
      try {
        const topic = yield select(selectors.getTopic)
        const gif = yield call(fetchGif, topic)
        yield put(actions.receiveGif(gif))
      } catch (error) {
        console.error(error)
      }
    }

    function *requestMoreWatcher() {
      while (true) {
        const { topic } = yield takeLocal(types.REQUEST_MORE)
        yield call(requestMoreSaga, topic)
      }
    }

    return requestMoreWatcher
  },
  initView({ actions, selectors }) {
    const Gif = ({ topic, url }) => (
      url ? (
        <img src={url} width={200} height={200} />
      ) : (
        <p>{'loading...'}</p>
      )
    )
    const RandomGif = ({ topic, url, requestMore }) => (
      <div style={{ width: '200px', display: 'inline-block' }}>
        <h2 style={{ width: '200px', textAlign: 'center' }}>{topic}</h2>
        <Gif topic={topic} url={url}/>
        <button onClick={() => requestMore(topic)}>More please!</button>
      </div>
    )
    const GifViewer = connect(
      state => ({
        url: selectors.getUrl(state),
        topic: selectors.getTopic(state)
      }),
      dispatch => ({
        requestMore(topic) {
          dispatch(actions.requestMore(topic))
        }
      })
    )(RandomGif)

    return GifViewer
  }
}))
