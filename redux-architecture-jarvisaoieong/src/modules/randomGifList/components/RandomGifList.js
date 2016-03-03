import React, {Component} from 'react';
import _ from 'lodash';

import {RandomGif} from 'modules/randomGif'
import {create, modify} from '../actions';

export default class RandomGifList extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(create(this.refs.text.value));
    this.refs.text.value = '';
  };

  render() {
    const {model, dispatch} = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="text" />
          <button>Enter</button>
        </form>
        {
          _.map(model.gifList, (gif) =>
            <div key={gif.id} style={{float: 'left'}}>
              <RandomGif {...{
                model: gif.data,
                dispatch: (action) => dispatch(modify(gif.id, action)),
              }} />
            </div>
          )
        }
        <div style={{clear: 'both'}}></div>
      </div>
    );
  }

}
