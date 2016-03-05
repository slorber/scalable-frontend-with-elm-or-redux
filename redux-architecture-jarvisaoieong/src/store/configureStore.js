import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers, install} from '@jarvisaoieong/redux-loop';
import createLogger from '@jarvisaoieong/redux-logger';
import {reducer, init} from 'modules/main';

export default function configureStore() {
  const store = createStore(reducer, init(), compose(
    install(),
    applyMiddleware(createLogger({collapsed: true})),
  ));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('modules/main', () => {
      const {reducer: nextReducer} = require('modules/main');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
