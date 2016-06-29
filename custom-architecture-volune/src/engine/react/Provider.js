import React, { Component, PropTypes } from 'react';
import { engineType } from './propTypes';

export default class Provider extends Component {
  getChildContext() {
    return {
      engine: this.props.engine,
    };
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

Provider.propTypes = {
  children: PropTypes.node,
  engine: engineType,
};

Provider.childContextTypes = {
  engine: engineType,
};
