import { h } from 'deku'
import { override } from '../deku-override'
import { ITEM_ACTION } from './actions'
import { key } from './model'

const comp = ({ props }) => (
  h('div', {class: 'pair'}, [
    h('div', {class: 'pair-item'}, [props.one]),
    h('div', {class: 'pair-item'}, [props.two])
  ])
)

export default function Pair(one, two) {
  override(ITEM_ACTION, key.ONE, one)
  override(ITEM_ACTION, key.TWO, two)

  return h(comp, {one, two})
}
