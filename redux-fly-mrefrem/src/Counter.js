import React, { PropTypes } from 'react'
import { createReducer } from 'redux-fly'

const Counter = ({ reduxState: { counter } }) => (
  <p>Counter: {counter}</p>
)

Counter.propTypes = {
  reduxState: PropTypes.object.isRequired,
  buttonIsActive: PropTypes.func.isRequired,
  incrementAction: PropTypes.string.isRequired
}

export default createReducer({
  initialState: {
    counter: 0
  },
  listenActions: (state, action, props) => {
    if (action.type === props.incrementAction) {
      if (state.counter >= 10 && props.buttonIsActive()) {
        return { counter: state.counter + 2 }
      }
      return { counter: state.counter + 1 }
    }
    return state
  }
})(Counter)
