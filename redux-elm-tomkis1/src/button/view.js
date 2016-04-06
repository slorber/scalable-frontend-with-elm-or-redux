import React from 'react';

export default ({ model, dispatch }) =>
  <button style={{ color: model ? 'green' : 'red'}} onClick={() => dispatch({ type: 'Toggle'})}>Toggle</button>;
