import React from 'react';
import {toggle} from '../actions';

export default ({model, dispatch}) =>
  <button
    style={{
      backgroundColor: model ? 'green' : 'red',
    }}
    onClick={() => dispatch(toggle())}
  >
    {model ? 'active' : 'inactive'}
  </button>

