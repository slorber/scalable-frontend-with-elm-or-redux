import React from 'react'
import { SubspaceProvider } from 'react-redux-subspace'
import { RandomGifPair } from '../randomGifPair'

const RandomGifPairPair = () => (
  <div>
    <SubspaceProvider namespace='randomGifPair1'>
      <RandomGifPair />
    </SubspaceProvider>
    <SubspaceProvider namespace='randomGifPair2'>
      <RandomGifPair />
    </SubspaceProvider>
  </div>
)

export default RandomGifPairPair
