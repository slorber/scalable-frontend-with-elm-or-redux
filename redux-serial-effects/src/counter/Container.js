import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'

export const Component = ({ counterValue, inc, dec }) => (
  <div>
    <button style={{ width: '50px' }} onClick={() => inc(1)}>
      +
    </button>
    <span style={{ paddingLeft: '50px', paddingRight: '50px' }}>
      {counterValue}
    </span>
    <button style={{ width: '50px' }} onClick={() => dec(1)}>
      -
    </button>
  </div>
)

export default selector =>
  connect(
    state => ({ counterValue: state[selector] }),
    dispatch => bindActionCreators(actions, dispatch)
  )(Component)
