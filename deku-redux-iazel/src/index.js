import { createStore, applyMiddleware } from 'redux'
import { createRender } from './deku-override'
import task from './middlewares/task'
import observer from './middlewares/observer'
import Main from './main/component'
import { initDef } from './main/model'
import * as mr from './main/reducers'

const store = createStore(mr.stateReducer, initDef(), applyMiddleware(
  observer( mr.observer ),
  task( mr.taskReducer )
))
const render = createRender(document.getElementById('mount'), store.dispatch)
const app = () => render( Main(store.getState()) )

app()
store.subscribe(app)
