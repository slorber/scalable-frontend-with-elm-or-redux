import { call, fork, take, put } from 'redux-saga/effects'
import { compose, lift } from 'ramda'
import * as randomGif from '../randomGif'
import * as tasks from '../tasks'
import * as actions from './actions'

const withPosition = position => url => ({ url, position })

function* doRequestMore(position, topic) {
  yield put(actions.pending({ position }))
  const task = compose(lift(withPosition(position)), randomGif.tasks.fetchRandomGif)(topic)
  yield put(tasks.actions.runTask(task, actions.NEW_GIF, actions.NEW_GIF))
}

function* watchRequestMore() {
  while (true) {
    const { payload: { position, topic } } = yield take(actions.REQUEST_MORE)
    yield fork(doRequestMore, position, topic)
  }
}

export default function* () {
  yield [ fork(watchRequestMore) ]
}
