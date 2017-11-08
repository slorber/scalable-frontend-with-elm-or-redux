import React from 'react'
import relocatableGif from '../relocatableGif/Container'

const Container = mountPoint => ({ topics, onNewRequested }) => {
  const RandomGifPair = relocatableGif(mountPoint, 2)

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flexGrow: 1 }}>
        <RandomGifPair topics={topics} onNewRequested={onNewRequested} />
      </div>
    </div>
  )
}

export default Container
