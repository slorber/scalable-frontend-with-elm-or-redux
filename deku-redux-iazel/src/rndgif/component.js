import { h } from 'deku'
import { clickEvent } from '../utils/events'
import { setup, newGif } from './actions'
import * as m from './model'

const more = clickEvent(newGif)

const render = ({ props, dispatch }) => (
  h('div', {class: 'random-gif'}, [
    h('h2', {class: 'rg-topic'}, [props.topic]),
    h('div', {class: 'gif-wrapper'}, [
      h('img', {class: 'rg-gif', src: props.gif})
    ]),
    h('button',
      {class: 'rg-more', onClick: more(dispatch), disabled: props.loading},
      ['More please!']
     )
  ])
)

const onCreate = ({ dispatch }) => {
  dispatch( setup() )
}

const comp = { render, onCreate }

export default (state) => h(comp, {
  gif: m.getGif(state),
  topic: m.getTopic(state),
  loading: m.isLoading(state)
})
