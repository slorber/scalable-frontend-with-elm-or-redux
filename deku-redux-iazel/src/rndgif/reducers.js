import api from './api'
import * as m from './model'
import * as A from './actions'

export function stateReducer(state, action) {
  switch(action.type) {
    case A.LOADING:
      return state.withMutations(s => {
        m.setLoading(s, action.payload)
        if(action.payload === true)
          m.setLoadingGif(s)
      })

    case A.SET_GIF:
      return m.setGif(state, action.payload)

    default:
      return state
  }
}

export function taskReducer(dispatch, action, state) {
  switch(action.type) {
    case A.NEW_GIF:
      if( m.isLoading(state) )
        return false
      /* falls through */
    case A.SETUP:
      dispatch( A.loading(true) )

      return api.
        fetchNewGif( m.getTopic(state) ).
        then(src => { dispatch( A.setGif(src) ) }).
        catch(err => { alert(err.message); console.error(err.trace) }).
        complete(() => { dispatch( A.loading(false) ) })
    break

    default:
      return
  }
}
