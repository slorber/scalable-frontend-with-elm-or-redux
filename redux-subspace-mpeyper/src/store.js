import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, globalActions } from 'redux-subspace'
import thunk from 'redux-thunk'
import wormhole from 'redux-subspace-wormhole'
import API from './api'
import { reducer } from './app'

const middleware = applyMiddleware(
    thunk.withExtraArgument(new API()),
    globalActions('TOGGLE', 'INCREMENT'),
    wormhole('config')
)

export default createStore(reducer, composeWithDevTools(middleware))
