import React, { PropTypes } from 'react'
import Counter from './Counter'
import Button, { checkIsActive } from './Button'
import NewGif, { actionPrivateNewGif } from './RandomGif'

const gifStyle = { float: 'left', marginRight: '20px' }

const newGifActionPrefix = 'RandomGif'

const App = (props, { store }) => (
  <div>
    <h2>1. NewGif</h2>

    <h3>1.1 Single</h3>
    <NewGif reduxMountPath="newGif" reduxActionPrefix={newGifActionPrefix} />
    <hr/>

    <h3>1.2 Pair</h3>
    <NewGif reduxMountPath="pairGifs first" style={gifStyle} reduxActionPrefix={newGifActionPrefix} />
    <NewGif reduxMountPath="pairGifs second" reduxActionPrefix={newGifActionPrefix} />
    <hr style={{ clear: 'both' }} />

    <h3>1.3 Pair of pair</h3>
    <NewGif reduxMountPath="pairOfPair firstPairGifs first" style={gifStyle} reduxActionPrefix={newGifActionPrefix} />
    <NewGif reduxMountPath="pairOfPair firstPairGifs second" style={gifStyle} reduxActionPrefix={newGifActionPrefix} />
    <NewGif reduxMountPath="pairOfPair secondPairGifs first" style={gifStyle} reduxActionPrefix={newGifActionPrefix} />
    <NewGif reduxMountPath="pairOfPair secondPairGifs second" reduxActionPrefix={newGifActionPrefix} />
    <hr style={{ clear: 'both' }} />

    <h2>2. Button</h2>
    <Button reduxMountPath="button" />
    <hr/>

    <h2>3. Counter</h2>
    <Counter reduxMountPath="counter" buttonIsActive={() => checkIsActive('button', store.getState())} incrementAction={actionPrivateNewGif(newGifActionPrefix)} />
    <hr/>
  </div>
);

App.contextTypes = {
  store: PropTypes.object.isRequired
}

export default App
