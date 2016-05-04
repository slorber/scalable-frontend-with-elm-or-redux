const pdEvent = (action) => (dispatch, ...rest) => (e) => {
  e.preventDefault()
  dispatch( action(...rest) )
}

export const clickEvent = pdEvent
export const submitEvent = pdEvent

export const changeEvent = (action) => (dispatch, ...rest) => (e) => {
  dispatch(action(...rest, e.target.name, e.target.value))
}
