import React from 'react'
import { connect } from 'react-redux'
import moduxFactory from 'modux-js'

export const types = {
  INCREMENT_COUNTER: 'modux-js-examples/counter/INCREMENT_COUNTER'
}

export const init = value => value

const defaultInitialState = init(42)

export default moduxFactory(context => {
  return {
    initReducer(initialState = defaultInitialState) {
      const value = (value = initialState, action = {}) => {
        if (action.type === types.INCREMENT_COUNTER) {
          return value += action.payload.amount
        }
        return value
      }
      return value
    },
    actions: {
      increment(amount) {
        return {
          type: types.INCREMENT_COUNTER,
          payload: { amount }
        }
      }
    },
    selectors: {
      getValue(value) {
        return value
      }
    },
    initView({ actions, selectors }) {
      const Counter = ({ value }) => (
        <div>
          <span>Value : { value }</span>
        </div>
      )
      const CounterContainer = connect(
        state => ({
          value: selectors.getValue(state)
        })
      )(Counter)
      return CounterContainer
    }
  }
})
