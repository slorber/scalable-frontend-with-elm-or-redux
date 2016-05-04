import { List, Map } from 'immutable'

const init = () => Map({
  items: List(),
  inpts: Map()
})

const get = (state, i) => state.getIn(['items', i])
const set = (state, i, item) => state.setIn(['items', i], item)
const push = (state, item) => state.set('items', state.get('items').push(item))
const getItems = (state) => state.get('items')

const remove = (state, i) => state.set('items', state.get('items').delete(i))

const getNew = (state) => state.get('inpts')
const setNewVal = (state, field, value) => state.setIn(['inpts', field], value)

export {
  get,
  set,
  init,
  push,
  remove,
  getNew,
  setNewVal,
  getItems
}
