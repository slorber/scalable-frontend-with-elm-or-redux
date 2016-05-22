import List from './component'
import * as m from './model'

export default (comp, inputs, text) => (state) => (
  List( m.getItems(state).map(comp).toArray(), inputs( m.getNew(state) ), text)
)
