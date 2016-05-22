import { Map } from 'immutable'

export const init = (topic) => Map({
  topic,
  loading: false,
  gif: 'loading.gif'
})

export const getGif = (state) => state.get('gif')
export const getTopic = (state) => state.get('topic')
export const isLoading = (state) => state.get('loading')

export const setGif = (state, val) => state.set('gif', val)
export const setLoading = (state, val) => state.set('loading', val)
export const setLoadingGif = (state) => state.set('gif', 'loading.gif')
