import React from 'react'
import compose from './compose'
import RandomGif from './RandomGif'

const style = {
  display: 'flex',
  padding: '5px',
  border: '1px solid #ccc'
}

const template = (x, y) => <div style={style}>{x}{y}</div>

export default class RandomGifPair {

  constructor(leftTopic, rightTopic) {
    const composition = compose(
      new RandomGif(leftTopic),
      new RandomGif(rightTopic),
      template
    )
    this.init = composition.init
    this.update = composition.update
    this.view = composition.view
    this.run = composition.run
  }

}