export default (reducer) => ({ dispatch, getState }) => (next) => (action) => {
  if(action.meta && action.meta.task === true)
    return reducer(dispatch, action, getState())

  return next(action)
}
