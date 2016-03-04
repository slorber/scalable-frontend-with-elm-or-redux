import { call, fork, take, put } from 'redux-saga/effects'
import { compose, lift } from 'ramda'
import * as randomGif from '../randomGif'
import * as tasks from '../tasks'
import * as actions from './actions'

const withID = id => url => ({ url, id })

function* watchRequestMore() {
  while (true) {
    const { payload: { id, topic } } = yield take(actions.REQUEST_MORE)
    yield put(actions.pending(id))
    const task = compose(lift(withID(id)), randomGif.tasks.fetchRandomGif)(topic)
    yield put(tasks.actions.runTask(task, actions.NEW_GIF, actions.NEW_GIF))
  }
}

export default function* () {
  yield [ fork(watchRequestMore) ]
}
