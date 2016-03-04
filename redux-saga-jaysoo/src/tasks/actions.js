export const RUN_TASK = 'RUN_TASK'

export const runTask = (task, successType, failureType) => ({
  type: RUN_TASK,
  task,
  successType,
  failureType
})
