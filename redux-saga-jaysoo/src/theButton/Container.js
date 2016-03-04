import React from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { getModel } from './selectors'
import * as actions from './actions'

export const Component = ({ model, turnOn, turnOff }) => {
  return (
    <button onClick={ model ? turnOff : turnOn }
            style={{ color: 'white', backgroundColor: model ? 'green' : 'red' }}>
      { model ? 'ON' : 'OFF' }
    </button>
  )
}

export default connect(
  createStructuredSelector({
    model: getModel
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Component)
