import React, {Component} from 'react';

import {RandomGifPair} from 'modules/randomGifPair'
import {modifyFirst, modifySecond} from '../actions';

export default class RandomGifPairOfPair extends Component {

  render() {
    const {model, dispatch} = this.props;

    return (
      <div>
        <div style={{float: 'left'}}>
          <RandomGifPair {...{
            model: model.first,
            dispatch: (action) => dispatch(modifyFirst(action)),
          }} />
        </div>
        <div style={{float: 'left'}}>
          <RandomGifPair {...{
            model: model.second,
            dispatch: (action) => dispatch(modifySecond(action)),
          }} />
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    );
  }

}
