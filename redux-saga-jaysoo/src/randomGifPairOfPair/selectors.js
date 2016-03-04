import { compose, prop } from 'ramda'
import * as randomGifPair from '../randomGifPair'
import { name } from './__init__'

// getModel :: State -> Model
export const getModel = prop(name)

export const getTopLeft = compose(randomGifPair.selectors.getLeft, prop('top'), getModel)

export const getTopRight = compose(randomGifPair.selectors.getRight, prop('top'), getModel)

export const getBottomLeft = compose(randomGifPair.selectors.getLeft, prop('bottom'), getModel)

export const getBottomRight = compose(randomGifPair.selectors.getRight, prop('bottom'), getModel)