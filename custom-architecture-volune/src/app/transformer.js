import { toTransformer } from 'engine/utils';
import Msg from './messages';

export default [
  [
    Msg.GIF_RECEIVED,
    Msg.COUNTER_INCREMENTED,
    {
      create(sourceMessage, { getState }) {
        const {
          incrementByTwoEnabled,
          counterValue,
        } = getState();

        const souldIncrementByTwo = incrementByTwoEnabled && counterValue >= 10;
        return {
          increment: souldIncrementByTwo ? 2 : 1,
        };
      },
    },
  ],
]::toTransformer();
