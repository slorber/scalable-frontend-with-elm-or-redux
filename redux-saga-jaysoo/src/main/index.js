import React from 'react'
import { combineReducers } from 'redux'
import { fork, take, race, put } from 'redux-saga/effects'
import * as counter from '../counter'
import * as randomGif from '../randomGif'
import * as randomGifPair from '../randomGifPair'
import * as randomGifPairOfPair from '../randomGifPairOfPair'
import * as randomGifList from '../randomGifList'
import * as theButton from '../theButton'
import * as tasks from '../tasks'

export const reducer = combineReducers(
  { [counter.name]: counter.reducer
  , [randomGif.name]: randomGif.reducer
  , [randomGifPair.name]: randomGifPair.reducer
  , [randomGifPairOfPair.name]: randomGifPairOfPair.reducer
  , [randomGifList.name]: randomGifList.reducer
  , [theButton.name]: theButton.reducer
  })

function* watchForGifListAndButtonChanges(getState) {
  while (true) {
    yield race(
      [ take(randomGifList.actions.NEW_GIF)
      , take(randomGif.actions.NEW_GIF)
      , take(randomGifPair.actions.NEW_GIF)
      , take(randomGifPairOfPair.actions.NEW_GIF)
      ]
    )

    const state = getState()
    const currCount = counter.selectors.getModel(state)
    const buttonState = theButton.selectors.getModel(state)

    if (currCount >= 10 && buttonState) {
      yield put(counter.actions.inc())
      yield put(counter.actions.inc())
    } else {
      yield put(counter.actions.inc())
    }
  }
}

export function* saga(getState) {
  yield [ fork(randomGif.saga)
        , fork(randomGifPair.saga)
        , fork(randomGifPairOfPair.saga)
        , fork(randomGifList.saga)
        , fork(tasks.saga)
        , fork(watchForGifListAndButtonChanges, getState)
        ]
}

export const Container = () => (
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

    <h2>Button Example:</h2>
    <div className="container">
      <theButton.Container/>
    </div>

    <hr/>

    <h2>Random GIF Example:</h2>
    <div className="container">
      <randomGif.Container/>
    </div>

    <hr/>

    <h2>Pair of Random GIF Example:</h2>
    <div className="container">
      <randomGifPair.Container/>
    </div>

    <hr/>

    <h2>Pair of Pair of Random GIF Example:</h2>
    <div className="container">
      <randomGifPairOfPair.Container/>
    </div>

    <hr/>

    <h2>List of Random GIF Example:</h2>
    <div className="container">
      <randomGifList.Container/>
    </div>
  </div>
)
