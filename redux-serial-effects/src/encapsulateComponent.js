import get_ from 'lodash/get'
import times_ from 'lodash/times'
import { combineReducers } from 'redux'
import { combineSubscribers } from 'redux-serial-effects'

function encapsulate(times, name) {
  const mapRepeat = f =>
    Array.isArray(times) ? times.map(f) : times_(times, f)
  const mountPoints = mapRepeat(x => `${name}.${x}`)

  const selector = num => state => get_(state, mountPoints[num])
  const designator = num => dispatch => action =>
    dispatch(Object.assign({}, action, { __mountPoint: mountPoints[num] }))

  return {
    forEach: f => times_(mountPoints.length, f),
    reducer: reducer => {
      const initialState = mountPoints.reduce(
        (acc, mountPoint) =>
          Object.assign({}, acc, {
            [mountPoint]: Object.assign(
              {},
              {
                __mountPoint: mountPoint
              },
              reducer(undefined, {})
            )
          }),
        {}
      )

      const reducers = mapRepeat(x => x).reduce(
        (acc, num) =>
          Object.assign({}, acc, {
            ['' + num]: (state = initialState[mountPoints[num]], action) => {
              return state.__mountPoint === action.__mountPoint
                ? reducer(state, action)
                : state
            }
          }),
        {}
      )
      return combineReducers(reducers)
    },

    subscriber: subscriber =>
      combineSubscribers(
        mapRepeat(x => x).reduce(
          (acc, num) =>
            Object.assign({}, acc, {
              ['' + num]: ({ from, to }, dispatch, extraArgument) => {
                subscriber(
                  { from, to },
                  action =>
                    dispatch(
                      Object.assign(action, { __mountPoint: mountPoints[num] })
                    ),
                  extraArgument
                )
              }
            }),
          {}
        )
      ),
    component: (component, num) => {
      return component(selector(num), designator(num))
    }
  }
}

export default encapsulate
