import React from 'react'
import { Container as RandomGifPair } from '../randomGifPair'

const Component = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1 }}>
        <h5>Top</h5>
        <RandomGifPair 
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <h5>Bottom</h5>
            <RandomGifPair 
            />
      </div>
    </div>
  )
}

export default Component;

