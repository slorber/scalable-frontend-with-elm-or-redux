import { action, taskAction } from '../utils/actions'

const base = 'RNDGIF_'

export const LOADING = base + 'LOADING'
export function loading(bool) {
  return action(LOADING, bool)
}

export const SETUP = base + 'SETUP'
export function setup() {
  return taskAction(SETUP)
}
export const NEW_GIF = base + 'NEW_GIF'
export function newGif() {
  return taskAction(NEW_GIF)
}

export const SET_GIF = base + 'SET_GIF'
export function setGif(gif) {
  return action(SET_GIF, gif)
}
