/* @flow */
import React from 'react';
import type { Action, State } from './types';

export default class Counter extends React.PureComponent {
  props: {
    state: State,
    dispatch: (Action) => void,
  }
  increment = () => { this.props.dispatch({ type: 'INCREMENT_CLICKED' }); }
  decrement = () => { this.props.dispatch({ type: 'DECREMENT_CLICKED' }); }
  render() {
    const { state } = this.props;
    return (
      <div>
        <button onClick={this.decrement} style={{ width: 50 }} children="-"/>
        <span style={{ margin: '0 50px' }}>
          { state }
        </span>
        <button onClick={this.increment} style={{ width: 50 }} children="+"/>
      </div>
    );
  }
}
