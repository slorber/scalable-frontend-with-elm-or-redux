import { kAction } from '../utils'
import { name } from './__init__'

export const ADD = `${name}/ADD`
export const CHANGE_TOPIC = `${name}/CHANGE_TOPIC`
export const NEW_GIF = `${name}/NEW_GIF`
export const REQUEST_MORE = `${name}/REQUEST_MORE`
export const PENDING = `${name}/PENDING`

export const add = topic => ({ type: ADD, payload: { topic }})

export const changeTopic = topic => ({ type: CHANGE_TOPIC, payload: { topic } })

export const newGif = ({ id, url }) => ({ type: NEW_GIF, payload: { id, url } })

export const requestMore = ({ id, topic }) => ({ type: REQUEST_MORE, payload: { id, topic } })

export const pending = id => ({ type: PENDING, payload: { id } })
