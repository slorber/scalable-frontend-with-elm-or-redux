import {loop, Effects} from '@jarvisaoieong/redux-loop';

import {init as randomGifPairInit} from 'modules/randomGifPair';
import {modifyFirst, modifySecond} from './actions';

export default (firstTopic, secondTopic) => {
  const {
    model: firstModel,
    effect: firstEffect,
  } = randomGifPairInit(firstTopic, firstTopic);

  const {
    model: secondModel,
    effect: secondEffect,
  } = randomGifPairInit(secondTopic, secondTopic);

  return loop({
    first: firstModel,
    second: secondModel,
  },
    Effects.batch([
      Effects.map(firstEffect, modifyFirst),
      Effects.map(firstEffect, modifySecond),
    ])
  );

}
