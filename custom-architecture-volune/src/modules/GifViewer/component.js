import React, { PropTypes } from 'react';

const GifViewer = ({
  topic,
  url,
  onRequestMore,
}) => (
  <div style={{ width: '200px' }}>
    <h2 style={{ width: '200px', textAlign: 'center' }}>{topic}</h2>
    <img alt={`Gif about ${topic}`} src={url} width="200" height="200" />
    <button onClick={onRequestMore}>More Please!</button>
  </div>
);

GifViewer.propTypes = {
  topic: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onRequestMore: PropTypes.func.isRequired,
};

export default GifViewer;
