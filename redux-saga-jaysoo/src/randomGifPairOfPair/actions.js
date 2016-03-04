import { kAction } from '../utils'
import { name } from './__init__'

export const NEW_GIF = `${name}/NEW_GIF`
export const REQUEST_MORE = `${name}/REQUEST_MORE`
export const PENDING = `${name}/PENDING`

export const newGif = ({position, topic}) => ({ type: NEW_GIF, payload: {position, topic} })

export const requestMore = ({position, topic}) => ({ type: REQUEST_MORE, payload: {position, topic} })

export const pending = ({position}) => ({ type: PENDING, payload: {position} })
