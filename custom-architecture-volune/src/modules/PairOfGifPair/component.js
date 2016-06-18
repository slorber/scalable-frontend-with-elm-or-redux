import React, { PropTypes } from 'react';
import GifPair from './ConnectedGifPair';

const PairOfGifPair = ({
  topics,
}) => (<div>
  <GifPair topics={topics[0]} index={0} />
  <GifPair topics={topics[1]} index={1} />
</div>);

PairOfGifPair.propTypes = {
  topics: PropTypes.arrayOf(GifPair.propTypes.topics),
};

export default PairOfGifPair;
