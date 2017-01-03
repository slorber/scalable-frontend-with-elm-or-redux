/* @flow */
import React from 'react';

import RandomGif from '../RandomGif/Component';
import Button from '../Button/Component';
import Counter from '../Counter/Component';
import PairOf from '../Pair/Component';

import type { Action, State } from './types';

// need an annotation so that GifQuad's type gets inferred;
const GifPair: Class<React.Component<*, *, *>> = PairOf('row', RandomGif);
const GifQuad = PairOf('column', GifPair);

class Item extends React.PureComponent {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <span>
          { this.props.label }
        </span>
        <div style={{ marginTop: 10 }}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default class App extends React.PureComponent {
  props: {
    state: State,
    dispatch: (Action) => void,
  }
  delegate = {
    counter: (a: *) => this.props.dispatch({ type: 'COUNTER', payload: a }),
    button: (a: *) => this.props.dispatch({ type: 'BUTTON', payload: a }),
    gif: (a: *) => this.props.dispatch({ type: 'GIF', payload: a }),
    pair: (a: *) => this.props.dispatch({ type: 'PAIR', payload: a }),
    quad: (a: *) => this.props.dispatch({ type: 'QUAD', payload: a }),
  }
  render() {
    return (
      <div>
        <Item label='Button:'>
          <Button
            state={this.props.state.button}
            dispatch={this.delegate.button}
          />
        </Item>
        <Item label='Counter:'>
          <Counter
            state={this.props.state.counter}
            dispatch={this.delegate.counter}
          />
        </Item>
        <Item label='Gif:'>
          <RandomGif
            state={this.props.state.gif}
            dispatch={this.delegate.gif}
          />
        </Item>
        <Item label='Pair:'>
          <GifPair
            state={this.props.state.pair}
            dispatch={this.delegate.pair}
          />
        </Item>
        <Item label='Quad:'>
          <GifQuad
            state={this.props.state.quad}
            dispatch={this.delegate.quad}
          />
        </Item>
      </div>
    );
  }
}
