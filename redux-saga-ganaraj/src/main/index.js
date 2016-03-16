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
        gifList: randomGifList.reducer
    })

export const App = () => (
    <div>
        <hr/>
        
        <h2>Counter Example: </h2>
        <div className="container">
            <counter.Container/>
        </div>

        <hr/>

        <h2>Counter Example 2: </h2>
        <div className="container">
            <counter.Container/>
        </div>

        <h2>Button Example: </h2>
        <div className="container">
            <theButton.Container/>
        </div>

        <hr/>
        
        <h2>Random Gif Example: </h2>
        <div className="container">
            <randomGif.Container/>
        </div>

        <hr/>
        
        <h2>Random Gif Example: </h2>
        <div className="container">
            <randomGif.Container/>
        </div>

        <hr/>
    </div>
)
