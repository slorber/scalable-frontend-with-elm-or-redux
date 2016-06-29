import { toMapper } from 'engine/utils';
import Msg from './messages';

export default [
  [
    Msg.NEW_TOPIC_CHANGED,
    {
      map(
        { args }
      ) {
        const [event] = args;
        return {
          newTopic: event.currentTarget.value,
        };
      },
      preventDefault: true,
    },
  ],
  [
    Msg.TOPIC_ADDED,
    {
      map(
        source,
        { getState }
      ) {
        const { newTopic } = getState();
        return {
          topic: newTopic,
        };
      },
      preventDefault: true,
    },
  ],
  [
    Msg.GIF_RECEIVED,
    {
      map(
        { args, getEmitterProps }
      ) {
        const [url] = args;
        return {
          url,
          index: getEmitterProps().index,
        };
      },
    },
  ],
]::toMapper();
