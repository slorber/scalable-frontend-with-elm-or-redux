import {loop, Effects} from '@jarvisaoieong/redux-loop';

import {init as randomGifInit} from 'modules/randomGif';
import {init as randomGifPairInit} from 'modules/randomGifPair';
import {init as randomGifPairOfPairInit} from 'modules/randomGifPairOfPair';
import {init as randomGifListInit} from 'modules/randomGifList';

const {
  model: randomGifModel,
  effect: randomGifEffect,
} = randomGifInit('funny cats');

const {
  model: randomGifPairModel,
  effect: randomGifPairEffect,
} = randomGifPairInit('funny cats', 'funny dogs');

const {
  model: randomGifPairOfPairModel,
  effect: randomGifPairOfPairEffect,
} = randomGifPairOfPairInit('handsome', 'pretty');

const {
  model: randomGifListModel,
  effect: randomGifListEffect,
} = randomGifListInit(['hello', 'world']);

export default () =>
  loop({
    randomGif: randomGifModel,
    randomGifPair: randomGifPairModel,
    randomGifPairOfPair: randomGifPairOfPairModel,
    randomGifList: randomGifListModel,
  },
    Effects.batch([
      randomGifEffect,
      randomGifPairEffect,
      randomGifPairOfPairEffect,
      randomGifListEffect,
    ])
  );
