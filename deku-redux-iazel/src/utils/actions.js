export const action = (type, payload = null, meta = null) => (
  {type, payload, meta}
)

export const taskAction = (type, payload) => action(type, payload, {task: true})
