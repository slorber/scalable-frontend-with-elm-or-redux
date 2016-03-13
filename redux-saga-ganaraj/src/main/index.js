import React from 'react'
import { combineReducers } from 'redux'
import { fork, take, race, put } from 'redux-saga/effects'
import * as counter from '../counter';
import * as theButton from '../theButton';

import * as randomGif from '../randomGif'
import * as randomGifPair from '../randomGifPair'
import * as randomGifPairOfPair from '../randomGifPairOfPair'
import * as randomGifList from '../randomGifList'

export const reducer = combineReducers(
  {
    // counter: counter.reducer,
    button: theButton.reducer,
    gif: randomGif.reducer,
    gifList: randomGifList.reducer
  })

export function* saga(getState) {
  yield [
      fork(randomGif.saga)
  ];
}

export const App = () => (
  <div>
    <h1>Scalable Frontend With Redux and Sagas</h1>
    <p>
      This project is an attempt to address the problem raised
      at <a href="https://github.com/slorber/scalable-frontend-with-elm-or-redux">
        slorber/scalable-frontend-with-elm-or-redux
      </a> by <a href="https://twitter.com/sebastienlorber">@sebastienlorber</a>.
    </p>
    <p>
      More documentation is needed, but the implementation works. Full "real world"
      example is found at the very bottom. The first three sections are just showcasing
      some modules that will be used in the final example.
    </p>

    <p>
      Note that each in the final example, the <code>theButton</code>, <code>counter</code>,
      and <code>randomGifList</code> modules are all decoupled from each other. The finally integration
      is done by the <code>main</code> module by listening to actions dispatched from the three
      modules through a saga.
    </p>

    <hr/>

    <h2>Counter Example:</h2>
    <div className="container">
      <counter.Container/>
    </div>

    <hr/>
    
    <h2>Counter Example 2:</h2>
    <div className="container">
      <counter.Container/>
    </div>

  </div>
)
