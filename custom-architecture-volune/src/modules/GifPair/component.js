import React, { PropTypes } from 'react';
import GifViewer from './ConnectedGifViewer';

const GifPair = ({
  topics,
}) => (<div>
  <span style={{ display: 'inline-block' }}>
    <GifViewer topic={topics[0]} index={0} />
  </span>
  <span style={{ display: 'inline-block' }}>
    <GifViewer topic={topics[1]} index={1} />
  </span>
</div>);

GifPair.propTypes = {
  topics: PropTypes.arrayOf(GifViewer.propTypes.topic),
};

export default GifPair;
