import ReactDOM from 'react-dom'
import { start } from 'tom'
import Main from './Main'
// import compose from './compose'

const app = start(Main)
// const app = start(compose(Main, Main)) // <= try this, it's fun
app.view$.subscribe(view => ReactDOM.render(view, document.getElementById('app')))
