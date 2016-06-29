import { toConsumer } from 'engine/utils';
import Msg from './messages';

export default [
  [
    Msg.GIF_RECEIVED,
    (message, { getApiProps }) => {
      const { onNewGif } = getApiProps();
      if (onNewGif) {
        onNewGif(message);
      }
    },
  ],
]::toConsumer();
