import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import localState from '../localState';
import * as actions from './actions'

export const Counter = ({ count, increment, decrement }) => (
  <div>
    <button style={{ width: '50px' }} onClick={() => increment()}>
      +
    </button>
    <span style={{ paddingLeft: '50px', paddingRight: '50px' }}>
      {count}
    </span>
    <button style={{ width: '50px' }} onClick={() => decrement()}>
      -
    </button>
  </div>
)

function mapStateToProps(state, ownProps) {
  return {
    count: state.counter[ownProps.selector].count
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    increment: () => dispatch(actions.increment(ownProps.selector)),
    decrement: () => dispatch(actions.decrement(ownProps.selector))
  };
}

export default localState(connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter));
