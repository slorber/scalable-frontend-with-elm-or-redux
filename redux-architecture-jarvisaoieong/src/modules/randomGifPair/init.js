import {loop, Effects} from '@jarvisaoieong/redux-loop';

import {init as randomGifInit} from 'modules/randomGif';
import {modifyFirst, modifySecond} from './actions';

export default (firstTopic, secondTopic) => {
  const {
    model: firstModel,
    effect: firstEffect,
  } = randomGifInit(firstTopic);

  const {
    model: secondModel,
    effect: secondEffect,
  } = randomGifInit(secondTopic);

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
