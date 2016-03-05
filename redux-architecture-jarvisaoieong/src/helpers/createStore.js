import {createStore, applyMiddleware, compose} from 'redux';
import {install} from '@jarvisaoieong/redux-loop';
import createLogger from '@jarvisaoieong/redux-logger';

export default (reducer, initialState) =>
  createStore(reducer, initialState, compose(
    install(),
    applyMiddleware(createLogger({collapsed: true})),
  ))
