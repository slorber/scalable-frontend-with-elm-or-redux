import { kAction } from '../utils'
import { name } from './__init__'

export const NEW_GIF = `${name}/NEW_GIF`
export const REQUEST_MORE = `${name}/REQUEST_MORE`
export const PENDING = `${name}/PENDING`

export const newGif = ({side, url}) => ({ type: NEW_GIF, payload: {side, url} })

export const requestMore = ({side, topic}) => ({ type: REQUEST_MORE, payload: {side, topic} })

export const pending = ({side}) => ({ type: PENDING, payload: {side} })
