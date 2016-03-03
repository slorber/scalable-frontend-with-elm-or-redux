import {loop, Effects} from '@jarvisaoieong/redux-loop';
import {fetchRandomGif} from './tasks';
import {newGif} from './actions';

export default (topic) => {
  return loop({
    topic,
    gifUrl: require('./components/waiting.gif'),
  },
    Effects.promise(fetchRandomGif, topic)
  );
}
