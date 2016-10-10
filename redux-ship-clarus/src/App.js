// @flow
import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import * as RandomGifPairController from './random-gif-pair/controller';
import RandomGifPair from './random-gif-pair/view';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class App extends PureComponent<void, Props, void> {
  handleDispatchRandomGifPair = (action: RandomGifPairController.Action): void => {
    this.props.dispatch({
      type: 'RandomGifPair',
      action,
    });
  };

  tags = {
    first: 'cat',
    second: 'dog',
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Scalable frontend, with Elm or Redux</h2>
        </div>
        <RandomGifPair
          dispatch={this.handleDispatchRandomGifPair}
          state={this.props.state.randomGifPair}
          tags={this.tags}
        />
      </div>
    );
  }
}
