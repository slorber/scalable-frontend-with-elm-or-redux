import React from 'react';
import {inc, dec} from '../actions';

export default (props) => {
  const {model, dispatch} = props;
  return (
    <div>
      <button
        style={{width: '50px'}}
        onClick={() => dispatch(inc())}
      >
        +
      </button>
      <span
        style={{paddingLeft: '50px', paddingRight: '50px'}}
      >
        {model}
      </span>
      <button
        style={{width: '50px'}}
        onClick={() => dispatch(dec())}
      >
        -
      </button>
    </div>
  );
}
