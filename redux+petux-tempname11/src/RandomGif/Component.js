/* @flow */
import React from 'react';
import type { Action, State } from './types';

export default class RandomGif extends React.PureComponent {
  props: {
    state: State,
    dispatch: (Action) => void,
  }
  more = () => this.props.dispatch({ type: 'MORE_BUTTON_CLICKED' })
  render() {
    const { topic, status } = this.props.state;
    return (
      <div style={{
        width: 200,
        textAlign: 'center',
      }}>
        <p>
          <strong>Topic:</strong>
          {' '}
          <span>{topic}</span>
        </p>
        <div style={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid black',
          padding: 10,
        }}>
          {
            status === 'loading' ? (
              <span>Loading...</span>
            ) : status === 'failed' ? (
              <span style={{ color: 'red' }}>Loading Failed!</span>
            ) : (
              <img src={status.src} alt={topic} width='200' height='200'/>
            )
          }
        </div>
        <button
          style={{ width: '100%' }}
          onClick={this.more}
        >
          More
        </button>
      </div>
    );
  }
}
