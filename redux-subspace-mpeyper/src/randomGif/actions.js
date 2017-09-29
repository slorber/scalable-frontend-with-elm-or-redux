import { increment } from '../counter'

export const LOADING = 'LOADING'
export const SET_SRC = 'SET_SRC'

const loading = () => ({ type: LOADING })

const setGifSrc = (src) => ({ type: SET_SRC, src })

export const getGif = () => (dispatch, getState, api) => {
  dispatch(loading())

  api.getRandomGifUrl()
    .then((url) => dispatch(setGifSrc(url)))
    .then(() => dispatch(increment()))
}
