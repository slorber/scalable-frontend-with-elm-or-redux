import React from 'react'
import { connect } from 'react-redux'
import { combineReducers } from 'redux'
import moduxFactory from 'modux-js'

export const types = {
  TOGGLE_BUTTON: 'modux-js-examples/button/TOGGLE_BUTTON'
}

export const init = (active) => active

const defaultInitialState = init(false)

export default moduxFactory((context) => {
  return {
    actions: {
      toggleButton() {
        return {
          type: types.TOGGLE_BUTTON
        }
      }
    },
    selectors: {
      isActive(active) {
        return active
      }
    },
    initReducer(initialState = defaultInitialState) {
      const active = (active = initialState, action = {}) => {
        if (action.type == types.TOGGLE_BUTTON) {
          return !active
        }
        return active
      }
      return active
    },
    initView({ actions, selectors }) {
      const Button = ({ active, toggle }) => (
        <div>
          <button onClick={toggle}>{ active ? 'ON' : 'OFF' }</button>
        </div>
      )
      const ButtonContainer = connect(
        state => ({
          active: selectors.isActive(state)
        }),
        dispatch => ({
          toggle() {
            dispatch(actions.toggleButton())
          }
        })
      )(Button)
      return ButtonContainer
    }
  }
})
