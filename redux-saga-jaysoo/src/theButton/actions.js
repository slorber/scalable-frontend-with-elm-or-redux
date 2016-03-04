import { kAction } from '../utils'
import { name } from './__init__'

export const TURN_ON = `${name}/TURN_ON`
export const TURN_OFF = `${name}/TURN_OFF`

export const turnOn = kAction(TURN_ON)
export const turnOff = kAction(TURN_OFF)
