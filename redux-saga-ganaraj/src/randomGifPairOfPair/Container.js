import React from 'react'
import { Container as RandomGifPair } from '../randomGifPair'

const Component = ({ selector}) => {
  const topSelector = `${selector}_topPair`; 
  const bottomSelector = `${selector}_bottomPair`;  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1 }}>
        <h5>Top</h5>
        <RandomGifPair 
            selector={topSelector}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <h5>Bottom</h5>
            <RandomGifPair 
            selector={bottomSelector}
            />
      </div>
    </div>
  )
}

export default Component;

