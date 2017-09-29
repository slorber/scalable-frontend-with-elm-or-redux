import React from 'react'
import { SubspaceProvider } from 'react-redux-subspace'
import { RandomGif } from '../randomGif'

const RandomGifPair = () => (
  <div style={{ display: 'flex' }}>
    <SubspaceProvider namespace='randomGif1'>
      <div style={{ marginRight: '10px' }}>
        <RandomGif />
      </div>
    </SubspaceProvider>
    <SubspaceProvider namespace='randomGif2'>
      <div style={{ flowGrow: 1 }}>
        <RandomGif />
      </div>
    </SubspaceProvider>
  </div>
)

export default RandomGifPair
