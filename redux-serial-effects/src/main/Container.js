import React from 'react'
import counter from '../counter/Container'
import button from '../button/Container'
import relocatableGif from '../relocatableGif/Container'
import randomGifPair from '../randomGifPair/Container'
import randomGifPairOfPair from '../randomGifPairOfPair/Container'
import mountPoints from './mountPoints'

const Container = ({ onNewRequested }) => {
  const Counter = counter('counter')
  const Button = button('button')
  const RandomGif = relocatableGif(mountPoints.randomGif, 1)
  const RandomGifPair = randomGifPair(mountPoints.randomGifPair)
  const RandomGifPairOfPair = randomGifPairOfPair(
    mountPoints.randomGifPairOfPair
  )

  return (
    <div>
      <Counter />
      <Button />
      <RandomGif topics={['what']} onNewRequested={onNewRequested} />
      <RandomGifPair topics={['win', 'lose']} onNewRequested={onNewRequested} />
      <RandomGifPairOfPair
        topics={['GoT', 'lotr', 'star wars', 'star trek']}
        onNewRequested={onNewRequested}
      />
    </div>
  )
}

export default Container
