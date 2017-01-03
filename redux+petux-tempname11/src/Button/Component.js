/* @flow */
import React from 'react';
import type { Action, State } from './types';

export default class RandomGif extends React.PureComponent {
  props: {
    state: State,
    dispatch: (Action) => void,
  }
  click = () => { this.props.dispatch({ type: 'CLICKED' }); }
  render() {
    const { state } = this.props;
    return (
      <button onClick={this.click} style={{
        backgroundColor: state ? 'green' : 'red',
        color: 'white',
      }}>
        { state ? 'ON' : 'OFF' }
      </button>
    );
  }
}
