import { call, fork, take, put } from 'redux-saga/effects'
import * as tasks from '../tasks'
import * as actions from './actions'
import { fetchRandomGif } from './tasks'

function* watchRequestMore() {
  while (true) {
    const { payload: topic } = yield take(actions.REQUEST_MORE)
    yield put(actions.pending())
    yield put(tasks.actions.runTask(fetchRandomGif(topic), actions.NEW_GIF, actions.NEW_GIF))
  }
}

export default function* () {
  yield [ fork(watchRequestMore) ]
}