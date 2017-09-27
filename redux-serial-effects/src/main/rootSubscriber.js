import { combineSubscribers } from 'redux-serial-effects'
import relocatableGif from '../relocatableGif/subscriber'
import randomGifPair from '../randomGifPair/subscriber'
import randomGifPairOfPair from '../randomGifPairOfPair/subscriber'
import mountPoints from './mountPoints'

const randomGif = relocatableGif(mountPoints.randomGif, 1)
const randomGifPairSubscriber = randomGifPair(mountPoints.randomGifPair)
const randomGifPairOfPairSubscriber = randomGifPairOfPair(
  mountPoints.randomGifPairOfPair
)

const rootSubscriber = combineSubscribers({
  [mountPoints.randomGif]: randomGif,
  [mountPoints.randomGifPair]: randomGifPairSubscriber,
  [mountPoints.randomGifPairOfPair]: randomGifPairOfPairSubscriber
})

export default rootSubscriber
