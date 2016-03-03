import React, {Component} from 'react';
import _ from 'lodash';

import {requestMore} from '../actions';

export default class RandomGif extends Component {

  render() {
    const {model, dispatch} = this.props;
    return (
      <div style={{width: '200px'}}>
        <span>{model.topic}</span>
        <img
          src={_.get(model, 'gifUrl')}
          style={{
            width: '200px',
          }}
        />
        <button
          onClick={() => dispatch(requestMore())}
          style={{
            width: '200px',
          }}
        >
          More
        </button>
      </div>
    );
  }

}
