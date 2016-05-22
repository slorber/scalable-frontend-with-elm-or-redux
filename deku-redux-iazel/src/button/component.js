import { h } from 'deku'
import { clickEvent } from '../utils/events'
import { toggle } from './actions'

const onClick = clickEvent(toggle)

const comp = ({ props, dispatch }) => {
  const cs = props.active ? 'active' : 'inactive'
  const txt = props.active ? 'Active' : 'Inactive'

  return h('button', { class: 'the-button ' + cs, onClick: onClick(dispatch) }, [txt])
}

export default (active) => (
  h(comp, {active})
)
