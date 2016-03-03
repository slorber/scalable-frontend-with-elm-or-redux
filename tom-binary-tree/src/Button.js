import React from 'react'

// EVENTS

class Toggle {
  update(model) {
    return { model: !model }
  }
}

// APP

export default {

  init() {
    return { model: true }
  },

  update(model, event) {
    return event.update(model)
  },

  view(model, dispatch) {
    const onClick = () => dispatch(new Toggle())
    const style = { backgroundColor: model ? 'green' : 'red' }
    return <button onClick={onClick} style={style}>Click</button>
  }

}