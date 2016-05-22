export const combineStateReducers = (rs) => (state, action) => state.withMutations(s => {
  for(let k in rs) {
    let val = rs[k](s.get(k), action)
    s.set(k, val)
  }
})

export function combineTaskReducers(rs) {
  return (dispatch, action, state) => {
    let rv
    for(let k in rs) {
      let subs = k === '' ? state : state.get(k)
      // ~ debugger
      rv = rs[k](dispatch, action, subs)
      if(rv !== undefined)
        break
    }
    return rv
  }
}
