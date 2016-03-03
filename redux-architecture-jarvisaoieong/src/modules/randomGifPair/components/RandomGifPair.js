import React, {Component} from 'react';

import {RandomGif} from 'modules/randomGif'
import {modifyFirst, modifySecond} from '../actions';

export default class RandomGifPair extends Component {

  render() {
    const {model, dispatch} = this.props;

    return (
      <div>
        <div style={{float: 'left'}}>
          <RandomGif {...{
            model: model.first,
            dispatch: (action) => dispatch(modifyFirst(action)),
          }} />
        </div>
        <div style={{float: 'left'}}>
          <RandomGif {...{
            model: model.second,
            dispatch: (action) => dispatch(modifySecond(action)),
          }} />
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    );
  }

}
