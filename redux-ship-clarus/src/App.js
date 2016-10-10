// @flow
import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import * as RandomGifController from './random-gif/controller';
import RandomGif from './random-gif/view';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class App extends PureComponent<void, Props, void> {
  handleDispatchRandomGif: (action: RandomGifController.Action) => void = (action) => {
    this.props.dispatch({
      type: 'RandomGif',
      action,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Scalable frontend, with Elm or Redux</h2>
        </div>
        <RandomGif
          dispatch={this.handleDispatchRandomGif}
          state={this.props.state.randomGif}
          tag="cat"
        />
      </div>
    );
  }
}
