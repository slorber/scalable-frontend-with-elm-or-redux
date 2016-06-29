import React, { PropTypes } from 'react';
import GifViewer from './ConnectedGifViewer';

const GifList = (
  {
    topics,
    newTopic,
    onAddTopic,
    onNewTopicChange,
  }
) => (<div>
  <input
    value={newTopic}
    onChange={onNewTopicChange}
    style={{ width: '200px' }}
  />
  <br />
  <button onClick={onAddTopic}>Add</button>
  <br />
  {topics.map((topic, index) => (
    <span style={{ display: 'inline-block' }} key={index}>
      <GifViewer topic={topic} index={index} />
    </span>
  ))}
</div>);

GifList.propTypes = {
  topics: PropTypes.arrayOf(GifViewer.propTypes.topic),
  newTopic: PropTypes.string,
  onAddTopic: PropTypes.func.isRequired,
  onNewTopicChange: PropTypes.func.isRequired,
};

export default GifList;
