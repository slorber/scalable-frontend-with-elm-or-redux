import React from 'react'
import { Container as RandomGif } from '../randomGif'

const Component = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flexGrow: 1 }}>
        <RandomGif 
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <RandomGif 
        />
      </div>
    </div>
  )

};

export default Component;
