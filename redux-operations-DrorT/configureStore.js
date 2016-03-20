import { createStore, compose } from 'redux'
import {reduxOperations} from 'redux-operations';
import rootReducer from './rootReducer'
import DevTools from './DevTools';


const enhancer = compose(
    reduxOperations(),
    DevTools.instrument()
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
