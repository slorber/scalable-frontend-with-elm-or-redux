import React, { PropTypes } from 'react'
import { createReducer, getState } from 'redux-fly'

const Button = ({ reduxState: { isActive }, reduxSetState }) => (
  <button
    style={{ color: 'white', background: isActive ? 'green' : 'red' }}
    onClick={() => reduxSetState('TOGGLE-ACTIVE', state => ({ isActive: !state.isActive }))}
  >
    Click me
  </button>
)

Button.propTypes = {
  reduxState: PropTypes.object.isRequired,
  reduxSetState: PropTypes.func.isRequired
}

export const checkIsActive = (mountPath, allState) => {
  const state = getState(mountPath)(allState)
  if (state) {
    return state.isActive
  } else {
    throw new Error(`Mounting path ${mountPath} isn't valid`)
  }
}

export default createReducer({
  initialState: {
    isActive: false
  }
})(Button)
