/* @flow */
import React from 'react';
import type { ActionOf, StateOf } from './types';

type WithProps<P> = React.Component<void, P, any>
type Matches<S, A> = Class<WithProps<{
  state: S,
  dispatch: (A) => void,
}>>;

export default function PairOf<S, A>(
  direction: 'row' | 'column',
  SubComponent: Matches<S, A>,
)
: Matches<StateOf<S>, ActionOf<A>> {
  return class Pair extends React.Component {
    props: {
      state: StateOf<S>,
      dispatch: (ActionOf<A>) => void,
    }
    delegate = {
      first: (a: A) => this.props.dispatch({ type: 'FIRST', payload: a }),
      second: (a: A) => this.props.dispatch({ type: 'SECOND', payload: a }),
    }
    render() {
      const { state } = this.props;
      return (
        <div style={{
          display: 'flex',
          flexDirection: direction,
          justifyContent: 'space-around',
          border: '1px solid black',
          padding: 10,
        }}>
          <SubComponent state={state[0]} dispatch={this.delegate.first}/>
          <SubComponent state={state[1]} dispatch={this.delegate.second}/>
        </div>
      )
    }
  }
}
