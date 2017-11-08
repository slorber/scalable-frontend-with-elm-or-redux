import { NEW_GIF, UPDATED } from './actionTypes'

const newGif = topic => ({ type: NEW_GIF, topic })

const updated = url => ({ type: UPDATED, url })

export { newGif, updated }
