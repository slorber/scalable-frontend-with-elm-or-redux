import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { createEngine } from 'engine';
import { assemble, toDispatchEventDictionary } from 'engine/react';
import transformer from './transformer';
import reducer from './reducer';
import Msg from './messages';
import GifViewer from './component/ConnectedGifViewer';
import GifPair from './component/ConnectedGifPair';
import PairOfGifPair from './component/ConnectedPairOfGifPair';
import GifList from './component/ConnectedGifList';
import Button from 'modules/Button';
import Counter from 'modules/Counter';

const CONTAINER_DOM_ID = 'app';

const GIF_VIEWER_TOPIC = 'funny cats';
const GIF_PAIR_TOPICS = [
  'funny dog',
  'funny mouse',
];
const PAIR_OF_GIF_PAIR_TOPICS = [
  [
    'blue',
    'green',
  ],
  [
    'yellow',
    'purple',
  ],
];
const GIF_LIST_DEFAULT_TOPICS = [
  'one',
  'two',
];

const App = ({
  counterValue,
  incrementByTwoEnabled,
  onIncrementByTwoToggled,
}) => (
  <div>
    <div style={{ float: 'left' }}>
      <h2>GifViewer</h2>
      <GifViewer topic={GIF_VIEWER_TOPIC} />
      <h2>GifPair</h2>
      <GifPair topics={GIF_PAIR_TOPICS} />
      <h2>PairOfGifPair</h2>
      <PairOfGifPair topics={PAIR_OF_GIF_PAIR_TOPICS} />
      <h2>GifList</h2>
      <GifList defaultTopics={GIF_LIST_DEFAULT_TOPICS} />
    </div>
    <div style={{ float: 'left' }}>
      <Button value={incrementByTwoEnabled} onClick={onIncrementByTwoToggled} />
      <Counter value={counterValue} />
    </div>
  </div>
);

App.propTypes = {
  counterValue: PropTypes.number.isRequired,
  incrementByTwoEnabled: PropTypes.bool.isRequired,
  onIncrementByTwoToggled: PropTypes.func,
};

const mapStateToProps = (state) => state;
const mapEventsToProps = {
  onIncrementByTwoToggled: Msg.INCREMENT_BY_TWO_TOGGLED,
}::toDispatchEventDictionary();

const AssembledApp = assemble({
  engineFactory(engineOptions) {
    return createEngine({
      ...engineOptions,
      transformer,
      reducer,
    });
  },
  mapStateToProps,
  mapEventsToProps,
})(App);

render(<AssembledApp />, document.getElementById(CONTAINER_DOM_ID));
