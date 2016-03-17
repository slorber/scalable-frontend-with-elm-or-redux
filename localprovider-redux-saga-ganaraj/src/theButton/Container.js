import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

export const Component = ({ isActive, toggleButton }) => {
  return (
    <button onClick={ toggleButton }
            style={{ color: 'white', backgroundColor: isActive ? 'green' : 'red' }}>
      { isActive ? 'ON' : 'OFF' }
    </button>
  );
}

export default connect(
  state => ({ isActive: state.button.isActive}),
  dispatch => bindActionCreators(actions, dispatch)
)(Component)
