// @flow
import React, { PureComponent } from 'react';
import './view.css';
import * as RandomGifController from '../random-gif/controller';
import RandomGif from '../random-gif/view';
import * as Controller from './controller';
import * as Model from './model';

export type Tags = {
  first: string,
  second: string,
};

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
  tags: Tags,
};

export default class RandomGifPair extends PureComponent<void, Props, void> {
  handleDispatchFirst = (action: RandomGifController.Action): void => {
    this.props.dispatch({type: 'First', action});
  };

  handleDispatchSecond = (action: RandomGifController.Action): void => {
    this.props.dispatch({type: 'Second', action});
  };

  render() {
    return (
      <div className="RandomGifPair">
        <RandomGif
          dispatch={this.handleDispatchFirst}
          state={this.props.state.first}
          tag={this.props.tags.first}
        />
        <RandomGif
          dispatch={this.handleDispatchSecond}
          state={this.props.state.second}
          tag={this.props.tags.second}
        />
      </div>
    );
  }
}
