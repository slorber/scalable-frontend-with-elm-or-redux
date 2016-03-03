import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers, install} from '@jarvisaoieong/redux-loop';
import createLogger from '@jarvisaoieong/redux-logger';

import reducer from '../reducers';

export default function configureStore({initialState}) {
  const store = createStore(reducer, initialState, compose(
    install(),
    applyMiddleware(createLogger({collapsed: true})),
  ));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      const {default: nextReducer} = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
