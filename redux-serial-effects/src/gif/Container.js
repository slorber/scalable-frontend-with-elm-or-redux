import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import states from './states'
import * as actions from './actions'

function renderGif(state, url, topic) {
  switch (state) {
    case states.ready:
      return <img src={url} alt={topic} style={{ width: '200px' }} />
    case states.request:
      return <span>Loading...</span>
    default:
      return <span>--</span>
  }
}

export const Component = ({ url, topic, state, newGif, onNewRequested }) => (
  <div>
    <p>
      <strong>Topic:</strong>
      {topic}
    </p>
    <div
      style={{
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {renderGif(state, url, topic)}
    </div>
    <button
      onClick={() => {
        newGif(topic)
        onNewRequested()
      }}
      style={{ width: '200px' }}
    >
      New
    </button>
  </div>
)

export default (selector, designator) =>
  connect(
    state => ({
      url: selector(state).url,
      state: selector(state).state
    }),
    dispatch => bindActionCreators(actions, designator(dispatch))
  )(Component)
