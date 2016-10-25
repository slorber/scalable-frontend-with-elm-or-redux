// @flow
import React, { PureComponent } from 'react';
import * as ButtonModel from './model';

type Props = {
  dispatch: (patch: ButtonModel.Patch) => void,
  state: ButtonModel.State,
};

export default class Button extends PureComponent<void, Props, void> {
  handleClickButton = (): void => {
    this.props.dispatch({
      type: 'Toggle',
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.handleClickButton}
          style={{
            backgroundColor: this.props.state.status,
          }}
        >
          Toggle
        </button>
      </div>
    );
  }
}
