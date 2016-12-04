import React, { PropTypes } from 'react'
import Counter from './Counter'
import Button, { checkIsActive } from './Button'
import RandomGIf, { newGifAction } from './RandomGif'
import PairGif from './PairGif'
import PairOfPairGif from './PairOfPairGif'

const randomGifActionPrefix = 'RandomGif'

const App = (props, { store }) => (
  <div>
    <h2>1. RandomGIf</h2>

    <h3>1.1 Single</h3>
    <RandomGIf
      reduxMountPath="randomGif"
      reduxActionPrefix={randomGifActionPrefix}
    />
    <hr/>

    <h3>1.2 Pair</h3>
    <PairGif randomGifActionPrefix={randomGifActionPrefix}/>
    <hr/>

    <h3>1.3 Pair of pair</h3>
    <PairOfPairGif randomGifActionPrefix={randomGifActionPrefix}/>
    <hr style={{ clear: 'both' }}/>

    <h2>2. Button</h2>
    <Button reduxMountPath="button"/>
    <hr/>

    <h2>3. Counter</h2>
    <Counter
      reduxMountPath="counter"
      buttonIsActive={() => checkIsActive('button', store.getState())}
      incrementAction={newGifAction(randomGifActionPrefix)}
    />
    <hr/>
  </div>
)

App.contextTypes = {
  store: PropTypes.object.isRequired
}

export default App
