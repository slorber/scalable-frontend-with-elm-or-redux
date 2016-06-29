import { toConsumer } from 'engine/utils';
import Msg from './messages';

export default [
  [
    Msg.GIF_REQUESTED,
    (message, { dispatch, getApiProps, getDependencies }) => {
      const { topic } = getApiProps();
      getDependencies().service.fetchGif(topic).then(url => {
        dispatch({
          type: Msg.GIF_RECEIVED,
          url,
        });
      });
    },
  ],
  [
    Msg.GIF_RECEIVED,
    (message, { getApiProps }) => {
      const { url } = message;
      const { onNewGif } = getApiProps();
      if (onNewGif) {
        onNewGif(url);
      }
    },
  ],
]::toConsumer();
