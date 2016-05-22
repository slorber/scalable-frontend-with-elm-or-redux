import { h } from 'deku'

export default (count) => (
  h('span', {class: 'counter'}, [count])
)
