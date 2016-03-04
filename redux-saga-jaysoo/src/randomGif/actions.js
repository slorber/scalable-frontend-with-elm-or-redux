import Task from 'data.task';
import { kAction } from '../utils'
import { name } from './__init__'

export const NEW_GIF = `${name}/NEW_GIF`
export const REQUEST_MORE = `${name}/REQUEST_MORE`
export const PENDING = `${name}/PENDING`

export const newGif = url => ({ type: NEW_GIF, payload: url })

export const requestMore = topic => ({ type: REQUEST_MORE, payload: topic })

export const pending = kAction(PENDING)
