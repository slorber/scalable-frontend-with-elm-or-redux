import encapsulate from '../encapsulateComponent'
import gifSubscriber from '../gif/subscriber'

export default (mountPoint, times) => {
  const encapsulated = encapsulate(times, mountPoint)
  return encapsulated.subscriber(gifSubscriber)
}
