import React from 'react'
import { select, put, call, fork } from 'redux-saga/effects'
import { connect } from 'react-redux'
import uniqueid from 'lodash.uniqueid'

import moduxFactory from 'modux-js'
import gifViewerFactory, { init as initGifViewer } from '../gif-viewer'

const defaultInitialState = {
  gifViewers: {},
}

export const types = {
  NEW_GIF_VIEWER_REQUESTED: 'modux-js-examples/gif-viewer-list/NEW_GIF_VIEWER_REQUESTED',
  GIF_VIEWER_CREATED: 'modux-js-examples/gif-viewer-list/GIF_VIEWER_CREATED',
}

const gifViewerListFactory = moduxFactory(context => ({
  actions: {
    create(initialState) {
      return {
        type: types.NEW_GIF_VIEWER_REQUESTED,
        payload: { initialState }
      }
    },
    created() {
      return {
        type: types.GIF_VIEWER_CREATED,
      }
    }
  },
  selectors: {
    getItemIds(items) {
      return Object.keys(items || {})
    }
  },
  initSaga({ takeLocal, actions }) {
    function *create(initialState) {
      const id = uniqueid('gifViewer')
      context.add(gifViewerFactory, id, initialState)
      yield put(actions.created())
      yield fork(context.getSaga(id))
    }
    function *watchForCreate() {
      while (true) {
        const { payload: { initialState } } = yield takeLocal(types.NEW_GIF_VIEWER_REQUESTED)
        yield fork(create, initialState)
      }
    }
    return watchForCreate
  },
  initView({ selectors }) {
    const GifViewerList = connect(
      state => ({
        gifViewersId: selectors.getItemIds(state)
      })
    )(({ gifViewersId }) => (
      <div>
      {gifViewersId.length > 0 && gifViewersId.map(id => {
        const GifViewer = context.getView(id)
        return <GifViewer key={id}/>
      })}
      </div>
    ))

    return GifViewerList
  }
}))

export default moduxFactory(context => {
  context.add(gifViewerListFactory, 'gifViewers')
  return {
    initView({ selectors, actions }) {
      let inputRef
      const GifViewerList = context.getView('gifViewers')
      const TopicInput = connect(
        null,
        dispatch => ({
          create(topic) {
            return dispatch(context.getActions('gifViewers').create(initGifViewer(topic)))
          }
        })
      )(({ create }) => (
        <input
          style={{
            display: 'block',
            margin: 'auto',
            lineHeight: '18px',
            width: '180px'
          }}
          ref={ref => inputRef = ref}
          placeholder="What kind of GIFs do you want?"
          onKeyDown={ev => ev.keyCode === 13 ? create(inputRef.value) : null} />
      ))

      const view = () => (
        <div>
          <TopicInput/>
          <div style={{ display: 'inline-block' }}>
            <GifViewerList/>
          </div>
        </div>
      )

      return view
    }
  }
})
