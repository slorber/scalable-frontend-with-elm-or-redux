import { h } from 'deku'
import makeList from '../list/make'
import RndGif from '../rndgif/component'

const inputs = (fs) => [
  h('div', {class: 'form-group'}, [
    h('label', {class: 'form-label'}, ['Topic']),
    h('input', {name: 'topic', class:'form-control', value: fs.get('topic')})
  ])
]

export default makeList(RndGif, inputs, 'Add Gif')
