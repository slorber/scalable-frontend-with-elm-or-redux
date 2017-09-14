import React from 'react'
import { SubspaceProvider } from 'react-redux-subspace'
import { RandomGif } from '../randomGif'
import { RandomGifPair } from '../randomGifPair'
import { RandomGifPairPair } from '../randomGifPairPair'
import { Button } from '../button'
import { Counter } from '../counter'

const App = () => (
  <div>
    <h2>1. RandomGif</h2>
    <hr/>
  
    <h3>1.1 Single</h3>
    <SubspaceProvider namespace='randomGif'>
      <RandomGif />
    </SubspaceProvider>
    <hr/>
    
    <h3>1.2 Pair</h3>
    <SubspaceProvider namespace='randomGifPair'>
      <RandomGifPair />
    </SubspaceProvider>
    <hr/>
    
    <h3>1.3 Pair of Pair</h3>
    <SubspaceProvider namespace='randomGifPairPair'>
      <RandomGifPairPair />
    </SubspaceProvider>
    <hr/>
    
    <h3>2. Button</h3>
    <SubspaceProvider namespace='button'>
      <Button />
    </SubspaceProvider>
    <hr/>
        
    <h3>3. Counter</h3>
    <SubspaceProvider namespace='counter'>
      <Counter />
    </SubspaceProvider>
    <hr/>
  </div>
)

export default App
