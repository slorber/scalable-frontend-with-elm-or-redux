import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { serialEffectsMiddleware } from 'redux-serial-effects'
import rootReducer, {
  getCounterValue,
  getButtonEnabledState
} from './main/rootReducer'
import rootSubscriber from './main/rootSubscriber'
import Container from './main/Container'
import { inc } from './counter/actions'
import './App.css'

const onNewGifRequested = ({ dispatch, getState }) => () => {
  const state = getState()
  if (getCounterValue(state) >= 10 && getButtonEnabledState(state)) {
    dispatch(inc(2))
  } else {
    dispatch(inc(1))
  }
}

const { middleware: serialEffects, subscribe } = serialEffectsMiddleware
subscribe(rootSubscriber)
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(serialEffects)
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container onNewRequested={onNewGifRequested(store)} />
      </Provider>
    )
  }
}

export default App
