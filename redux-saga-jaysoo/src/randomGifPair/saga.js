import { call, fork, take, put } from 'redux-saga/effects'
import { compose, lift } from 'ramda'
import * as randomGif from '../randomGif'
import * as tasks from '../tasks'
import * as actions from './actions'

const withSide = side => url => ({ url, side })

function* doRequestMore(side, topic) {
  yield put(actions.pending({ side }))
  const task = compose(lift(withSide(side)), randomGif.tasks.fetchRandomGif)(topic)
  yield put(tasks.actions.runTask(task, actions.NEW_GIF, actions.NEW_GIF))
}

function* watchRequestMore() {
  while (true) {
    const { payload: { side, topic } } = yield take(actions.REQUEST_MORE)
    yield fork(doRequestMore, side, topic)
  }
}

export default function* () {
  yield [ fork(watchRequestMore) ]
}
