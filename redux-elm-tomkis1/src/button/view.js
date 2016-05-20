import React from 'react';
import { view } from 'redux-elm';

export default view(({ model, dispatch }) =>
  <button style={{ color: model ? 'green' : 'red'}} onClick={() => dispatch({ type: 'Toggle'})}>Toggle</button>);
