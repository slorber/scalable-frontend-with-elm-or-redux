import React from 'react'
import { Rx } from 'tom'

function composeStates(x, y) {
  return {
    model: [x.model, y.model],
    effect: x.effect || y.effect ? [x.effect, y.effect] : null
  }
}

function isNotNil(x) {
  return x !== null && x !== undefined
}

const empty$ = Rx.Observable.empty()

const defaultTemplate = (x, y) => {
  return (
    <div>
      {x}
      {y}
    </div>
  )
}

// apps as groupoid
export default function compose(x, y, optionalTemplate) {
  const template = optionalTemplate || defaultTemplate
  return {

    init() {
      return composeStates(x.init(), y.init())
    },

    update([mx, my], [ex, ey]) {
      return composeStates(
        ex ? x.update(mx, ex) : { model: mx },
        ey ? y.update(my, ey) : { model: my }
      )
    },

    view([mx, my], dispatch) {
      const dispatchx = event => dispatch([event])
      const dispatchy = event => dispatch([null, event])
      return template(
        x.view(mx, dispatchx),
        y.view(my, dispatchy)
      )
    },

    run([effx, effy], event$) {
      const nextEvent0$ = effx && x.run ? x.run(effx, event$.pluck('0').filter(isNotNil)).map(event => [event]) : empty$
      const nextEvent1$ = effy && y.run ? y.run(effy, event$.pluck('1').filter(isNotNil)).map(event => [null, event]) : empty$
      return nextEvent0$.merge(nextEvent1$)
    }

  }
}
