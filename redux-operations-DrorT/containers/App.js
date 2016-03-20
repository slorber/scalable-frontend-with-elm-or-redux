import Counter from '../components/Counter'
import Counter2 from '../components/Counter2'
import Button from '../components/Button'
import RandomGif from '../components/RandomGif'
import PairOfRandomGifs from '../components/PairOfRandomGifs'

import React, { Component } from 'react'

export default class Counters extends Component {
    render() {
        const divStyle ={
            "clear":"both"
        }
        return (
            <div>
                <div className="instructions">
                    Explore the api in devtools to see operation flow, args, and descriptions ---->
                    <div>Your normal state is under userState</div>
                </div>
                <div className="plain-counter">
                    <h2>1. Plain counter</h2>
                    <Counter/>
                </div>
                <div className="button">
                    <h2>2. Button that changes colors when clicked</h2>
                    <Button />
                </div>
                <div className="randomGif1">
                    <h2>3. A randomGif - using the defualt reducer location</h2>
                    <RandomGif topic="Cats" />
                </div>
                <div className="pairOfRandomGif">
                    <h2>3. A pair of randomGifs - with state locations of -["gifs", "leftGif","main"], ["gifs", "rightGif","main"]</h2>
                    <PairOfRandomGifs locationAddition="main"/>
                </div>
                <div className="2pairOfRandomGif" style={divStyle}>
                    <h2>4. two pairs of randomGifs - with state locations of -["gifs", "leftGif","top"], ["gifs", "rightGif","top"], ["gifs", "leftGif","bottom"], ["gifs", "rightGif","bottom"]</h2>
                    <PairOfRandomGifs locationAddition="top"/>
                    <PairOfRandomGifs locationAddition="bottom"/>
                </div>
                <div style={divStyle}>
                    <h1>2nd Solution - original components are not chnaged </h1>
                    <h2>In this solution another reducer is using the data from the counter and button components and listens to the one action</h2>
                    <div className="plain-counter">
                        <h2>1. Plain counter</h2>
                        <Counter2 location={["gifCounter","counter"]}/>
                    </div>
                    <div className="button">
                        <h2>2. Button that changes colors when clicked</h2>
                        <Button location={["gifCounter","button"]}/>
                    </div>
                </div>
            </div>
        )
    }
}