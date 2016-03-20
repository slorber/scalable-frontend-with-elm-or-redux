import RandomGif from '../components/RandomGif'

import React, { Component } from 'react'

const leftGif = ['gifs', 'left'];
const rightGif = ['gifs', 'right'];

export default class PairOfRandomGifs extends Component {
    render() {
        const style={
            "float":"left"
        }
        const divStyle ={
            "clear":"both"
        }
        const {locationAddition} = this.props
        return (
            <div style={divStyle}>
                <span style={style}>
                    <RandomGif location={locationAddition ? leftGif.concat(locationAddition) : leftGif} topic="funny cats"/>
                </span>
                <span style={style}>
                    <RandomGif location={locationAddition ? rightGif.concat(locationAddition) : rightGif} topic="hampster"/>
                </span>
            </div>
        )
    }
}