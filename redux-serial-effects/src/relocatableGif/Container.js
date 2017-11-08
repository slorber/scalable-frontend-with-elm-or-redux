import React from 'react'
import gif from '../gif/Container'
import encapsulate from '../encapsulateComponent'

const RelocatableGif = (mountPoint, times) => ({ topics, onNewRequested }) => {
  const encapsulated = encapsulate(times, mountPoint)

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {encapsulated.forEach(x => {
        const Gif = encapsulated.component(gif, x)
        return (
          <div key={`${mountPoint}.${x}`} style={{ flexGrow: 1 }}>
            <Gif topic={topics[x]} onNewRequested={onNewRequested} />
          </div>
        )
      })}
    </div>
  )
}

export default RelocatableGif
