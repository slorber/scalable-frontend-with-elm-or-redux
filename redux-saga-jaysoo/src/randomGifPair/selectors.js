import { compose, prop } from 'ramda'
import * as randomGif from '../randomGif'
import { name } from './__init__'

// getModel :: State -> Model
export const getModel = prop(name)

export const getLeft = compose(randomGif.selectors.getModel, prop('left'), getModel)

export const getRight = compose(randomGif.selectors.getModel, prop('right'), getModel)