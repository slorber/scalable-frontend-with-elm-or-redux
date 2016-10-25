// @flow
import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './view.css';
import * as ButtonModel from './button/model';
import Button from './button/view';
import Counter from './counter/view';
import * as RandomGifController from './random-gif/controller';
import RandomGif from './random-gif/view';
import * as RandomGifPairController from './random-gif-pair/controller';
import RandomGifPair from './random-gif-pair/view';
import * as RandomGifPairPairController from './random-gif-pair-pair/controller';
import RandomGifPairPair from './random-gif-pair-pair/view';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Index extends PureComponent<void, Props, void> {
  handleDispatchButton = (action: ButtonModel.Patch): void => {
    this.props.dispatch({type: 'Button', action});
  };

  handleDispatchRandomGif = (action: RandomGifController.Action): void => {
    this.props.dispatch({type: 'RandomGif', action});
  };

  handleDispatchRandomGifPair = (action: RandomGifPairController.Action): void => {
    this.props.dispatch({type: 'RandomGifPair', action});
  };

  handleDispatchRandomGifPairPair = (action: RandomGifPairPairController.Action): void => {
    this.props.dispatch({type: 'RandomGifPairPair', action});
  };

  tags = {
    first: 'cats',
    second: 'lemurs',
  };

  tagsPair = {
    first: {
      first: 'unicorns',
      second: 'minions',
    },
    second: {
      first: 'pokemon',
      second: 'lizards',
    },
  };

  render() {
    return (
      <div className="Index">
        <div className="Index-header">
          <img src={logo} className="Index-logo" alt="logo" />
          <h2>Scalable frontend, with Elm or Redux</h2>
        </div>
        <p className="Index-intro">
          This is a solution to the problem <a href="https://github.com/slorber/scalable-frontend-with-elm-or-redux">Scalable frontend, with Elm or Redux</a> of <a href="https://github.com/slorber">Sébastien Lorber</a>.
          <br />
          It uses <a href="https://github.com/clarus/redux-ship">Redux Ship</a>. Open your Javascript console to see the logs.
        </p>
        <h1>Button</h1>
        <Button
          dispatch={this.handleDispatchButton}
          state={this.props.state.button}
        />
        <h1>Counter</h1>
        <Counter
          state={this.props.state.counter}
        />
        <h1>Simple</h1>
        <div className="Index-randomGif">
          <RandomGif
            dispatch={this.handleDispatchRandomGif}
            state={this.props.state.randomGif}
            tag="dogs"
          />
        </div>
        <h1>Pair</h1>
        <RandomGifPair
          dispatch={this.handleDispatchRandomGifPair}
          state={this.props.state.randomGifPair}
          tags={this.tags}
        />
        <h1>PairPair</h1>
        <RandomGifPairPair
          dispatch={this.handleDispatchRandomGifPairPair}
          state={this.props.state.randomGifPairPair}
          tagsPair={this.tagsPair}
        />
        <div className="Index-footer">
          <hr />
          <p>Built with <a href="https://github.com/clarus/redux-ship">Redux Ship</a> © Guillaume Claret</p>
        </div>
      </div>
    );
  }
}
