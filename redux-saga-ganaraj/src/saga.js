import { select, put, fork } from 'redux-saga/effects';
import { increment } from './counter/actions';
import { takeEvery } from 'redux-saga';
import { REQUEST_NEW_GIF } from './randomGif/actions';

const getCounter = state => state.counter;
const getButtonIsActive = state => state.button.isActive;

function* onRequestNewGif() {
    const counter = yield select(getCounter);
    const isActive = yield select(getButtonIsActive);

    yield put(increment());
    if( counter >= 10 && isActive) {
        yield put(increment());
    }
}

function* watchRequestNewGif(){
  yield* takeEvery(REQUEST_NEW_GIF, onRequestNewGif);
}

export default function* () {
  yield [ fork(watchRequestNewGif) ];
}