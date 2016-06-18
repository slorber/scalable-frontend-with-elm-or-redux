import { EVENTS as ENGINE_EVENTS } from 'engine';
import { toTransformer } from 'engine/utils';
import Msg from './messages';

export default [
  [
    ENGINE_EVENTS.INIT,
    Msg.TOPIC_ADDED,
    {
      *create(
        source,
        { getApiProps }
      ) {
        const {
          defaultTopics = [],
        } = getApiProps();
        for (const topic of defaultTopics) {
          yield {
            topic,
          };
        }
      },
    },
  ],
]::toTransformer();
