import { call, fork, put, take } from 'redux-saga/effects'
import { RUN_TASK } from './actions'

const runTask = (task) => (
  new Promise((res) => {
    task.fork(
      x => res({ rejected: x })
      ,
      x => res({ resolved: x })
    )
  })
)

function* doRunTask(task, successType, failureType) {
  const { resolved, rejected } = yield call(runTask, task)
  if (resolved) {
    yield put ({ type: successType, payload : resolved })
  } else {
    yield put ({ type: failureType, payload : rejected })
  }
}
function* watchRunTasks() {
  while (true) {
    const { task, successType, failureType } = yield take(RUN_TASK)
    yield fork(doRunTask, task, successType, failureType)
  }
}

export default function* () {
  yield [ fork(watchRunTasks) ]
}
