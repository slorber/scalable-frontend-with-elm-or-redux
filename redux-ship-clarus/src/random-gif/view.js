// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
  tag: string,
};

export default class RandomGif extends PureComponent<void, Props, void> {
  handleClickButton: () => void = () => {
    this.props.dispatch({
      type: 'Load',
      tag: this.props.tag,
    });
  };

  renderGif() {
    if (this.props.state.isLoading) {
      return <p>...</p>;
    }
    if (this.props.state.gifUrl) {
      return (
        <img
          alt="animated gif"
          src={this.props.state.gifUrl}
          style={{
            maxWidth: 400,
          }}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderGif()}
        <button
          disabled={this.props.state.isLoading}
          onClick={this.handleClickButton}
        >
          {this.props.state.isLoading ? 'Loading...' : 'New picture'}
        </button>
      </div>
    );
  }
}
