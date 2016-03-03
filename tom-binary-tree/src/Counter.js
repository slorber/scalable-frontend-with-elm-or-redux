import React from 'react'

// EVENTS

export class Increment {
  constructor(step) {
    this.step = step
  }
  update(model) {
    return { model: model + this.step }
  }
}

// APP

export default {

  init() {
    return { model: 0 }
  },

  update(model, event) {
    return event.update(model)
  },

  view(model) {
    return <p>Count: {model}</p>
  }

}