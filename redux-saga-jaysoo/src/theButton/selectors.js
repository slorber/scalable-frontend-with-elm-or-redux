import { prop } from 'ramda'
import { name } from './__init__'

// getModel :: State -> Model
export const getModel = prop(name)
