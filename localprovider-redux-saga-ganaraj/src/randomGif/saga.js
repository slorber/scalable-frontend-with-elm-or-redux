import { call, fork, take, put } from 'redux-saga/effects'
import {
  REQUEST_NEW_GIF,
  newGifSuccess
} from './actions';
import fetchRandomGif from './gifEndpoint';
import { takeEvery } from 'redux-saga';


function* requestNewGif({topic}) {
    const imageUrl = yield call(fetchRandomGif, topic);
    yield put(newGifSuccess(imageUrl));
}

function* watchRequestNewGif(){
  yield* takeEvery(REQUEST_NEW_GIF, requestNewGif);
}

export default function* () {
  yield [ fork(watchRequestNewGif) ];
}
