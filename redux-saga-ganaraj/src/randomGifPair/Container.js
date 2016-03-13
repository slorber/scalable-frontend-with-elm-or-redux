import React from 'react'
import { Container as RandomGif } from '../randomGif'

const Component = ( {selector}) => {
    const leftSelector = `left_${selector}`;
    const rightSelector = `right_${selector}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flexGrow: 1 }}>
        <RandomGif 
            selector={leftSelector}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <RandomGif 
            selector={rightSelector}
        />
      </div>
    </div>
  )

};

export default Component;
