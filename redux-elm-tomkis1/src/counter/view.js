import React from 'react';
import { view } from 'redux-elm';

export default view(({ model }) =>
  <div>Value: {model}</div>);

