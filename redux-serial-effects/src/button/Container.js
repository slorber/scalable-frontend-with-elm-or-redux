import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'

export const Component = ({ isEnabled, flip }) => (
  <div>
    <button
      style={{ color: 'white', backgroundColor: isEnabled ? 'green' : 'red' }}
      onClick={() => flip()}
    >
      {isEnabled ? 'Disable' : 'Enable'}
    </button>
  </div>
)

export default selector =>
  connect(
    state => ({ isEnabled: state[selector] }),
    dispatch => bindActionCreators(actions, dispatch)
  )(Component)
