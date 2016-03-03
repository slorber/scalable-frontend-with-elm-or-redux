import React from 'react'
import compose from './compose'
import RandomGifPair from './RandomGifPair'

const style = {
  padding: '5px',
  border: '2px solid #555'
}

const template = (x, y) => <div style={style}>{x}{y}</div>

export default class RandomGifPairOfPair {

  constructor(topLeftTopic, topRightTopic, bottomLeftTopic, bottomRightTopic) {
    const composition = compose(
      new RandomGifPair(topLeftTopic, topRightTopic),
      new RandomGifPair(bottomLeftTopic, bottomRightTopic),
      template
    )
    this.init = composition.init
    this.update = composition.update
    this.view = composition.view
    this.run = composition.run
  }

}