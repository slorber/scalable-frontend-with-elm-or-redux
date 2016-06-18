import { PropTypes } from 'react';
import { assemble } from 'engine/react';
import { createEngine } from 'engine';
import GifPair from './component';
import consumer from './consumer';
import mapper from './mapper';

const AssembledGifPair = assemble({
  engineFactory(engineOptions) {
    return createEngine({
      ...engineOptions,
      mapper,
      consumer,
    });
  },
})(GifPair);

AssembledGifPair.propTypes = {
  topics: GifPair.propTypes.topics,
  onNewGif: PropTypes.func,
};

export default AssembledGifPair;
