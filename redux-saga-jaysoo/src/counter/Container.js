import React from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { getModel } from './selectors'
import * as actions from './actions'

export const Component = ({ model, inc, dec }) => (
  <div>
    <button style={{ width: '50px' }} onClick={() => inc()}>
      +
    </button>
    <span style={{ paddingLeft: '50px', paddingRight: '50px' }}>
      {model}
    </span>
    <button style={{ width: '50px' }} onClick={() => dec()}>
      -
    </button>
  </div>
)

export default connect(
  createStructuredSelector({
    model: getModel
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Component)
