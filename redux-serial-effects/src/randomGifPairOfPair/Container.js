import React from 'react'
import relocatableGif from '../relocatableGif/Container'

const Container = mountPoint => ({ topics, onNewRequested }) => {
  const RandomGifPairOne = relocatableGif(mountPoint, [0, 1])
  const RandomGifPairTwo = relocatableGif(mountPoint, [2, 3])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flexGrow: 1 }}>
        <RandomGifPairOne
          topics={topics.slice(0, 2)}
          onNewRequested={onNewRequested}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <RandomGifPairTwo
          topics={topics.slice(2, 4)}
          onNewRequested={onNewRequested}
        />
      </div>
    </div>
  )
}

export default Container
