import { h } from 'deku'
import { override } from '../deku-override'
import { clickEvent, changeEvent, submitEvent } from '../utils/events'
import * as A from './actions'

const rm = clickEvent(A.remove)
const push = submitEvent(A.pushNew)
const chng = changeEvent(A.changeNewVal)

const li = (dispatch) => (comp, i) => (
  h('li', {class: 'list-item'}, [
    h('a', {href:'#', class: 'remove', onClick: rm(dispatch, i)}, ['×']),
    override(A.ITEM_ACTION, i, comp)
  ])
)

const comp = ({ props, dispatch }) => (
  h('div', {class: 'list-wrapper'}, [
    h('ul', {class: 'list'}, props.items.map( li(dispatch) )),
    h('form', {class: 'list-new', onSubmit: push(dispatch), onChange: chng(dispatch)}, [
      h('div', {class: 'list-new-fields'}, props.inputs),
      h('div', {class: 'list-new-actions'}, [
        h('button', {class: 'btn btn-submit'}, [props.txt_add_btn])
      ])
    ])
  ])
)

export default function List(items, inputs, txt_add_btn) {
  return h(comp, {items, inputs, txt_add_btn})
}
