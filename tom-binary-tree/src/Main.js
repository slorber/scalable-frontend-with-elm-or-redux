import { Rx } from 'tom'
import compose from './compose'
import Button from './Button'
import RandomGif, { MoreRequested } from './RandomGif'
import RandomGifPair from './RandomGifPair'
import RandomGifPairOfPair from './RandomGifPairOfPair'
import Counter, { Increment } from './Counter'

const composition = compose(
  Button,
  compose(
    Counter,
    compose(
      new RandomGif('dogs'),
      compose(
        new RandomGifPair('cats', 'lemurs'),
        new RandomGifPairOfPair('unicorns', 'minions', 'pokemon', 'lizards')
      )
    )
  )
)

const findEvent = (event, predicate) => {
  if (Array.isArray(event)) {
    return findEvent(event[0], predicate) || findEvent(event[1], predicate)
  } else if (predicate(event)) {
    return event
  }
}

const isMoreRequestedEvent = event => event instanceof MoreRequested

// business rule
const getIncrementStep = (count, active) => count >= 10 && active ? 2 : 1

class IncrementEffect {
  constructor(step) {
    this.step = step
  }
  run() {
    return Rx.Observable.just([null, [new Increment(this.step)]])
  }
}

const empty$ = Rx.Observable.empty()

export default {

  init() {
    const state = composition.init()
    return {
      model: state.model,
      effect: [null, state.effect]
    }
  },

  update(model, event) {
    const state = composition.update(model, event)
    const count = model[1][0]
    const active = model[0]
    const effect = findEvent(event, isMoreRequestedEvent) ?
      new IncrementEffect(getIncrementStep(count, active)) :
      null
    return {
      model: state.model,
      effect: [effect, state.effect]
    }
  },

  view: composition.view,

  run(effect, event$) {
    const mainNextEvent$ = effect[0] ? effect[0].run() : empty$
    const compositionNextEvent$ = effect[1] ? composition.run(effect[1], event$) : empty$
    return compositionNextEvent$.concat(mainNextEvent$)
  }

}
