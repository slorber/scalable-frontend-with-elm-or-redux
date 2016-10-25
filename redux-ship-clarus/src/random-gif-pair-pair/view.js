// @flow
import React, { PureComponent } from 'react';
import type {Tags} from '../random-gif-pair/view';
import * as RandomGifPairController from '../random-gif-pair/controller';
import RandomGifPair from '../random-gif-pair/view';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
  tagsPair: {
    first: Tags,
    second: Tags,
  },
};

export default class RandomGifPairPair extends PureComponent<void, Props, void> {
  handleDispatchFirst = (action: RandomGifPairController.Action): void => {
    this.props.dispatch({type: 'First', action});
  };

  handleDispatchSecond = (action: RandomGifPairController.Action): void => {
    this.props.dispatch({type: 'Second', action});
  };

  render() {
    return (
      <div>
        <RandomGifPair
          dispatch={this.handleDispatchFirst}
          state={this.props.state.first}
          tags={this.props.tagsPair.first}
        />
        <RandomGifPair
          dispatch={this.handleDispatchSecond}
          state={this.props.state.second}
          tags={this.props.tagsPair.second}
        />
      </div>
    );
  }
}
