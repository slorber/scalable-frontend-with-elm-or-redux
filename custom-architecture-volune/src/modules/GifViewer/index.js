import { PropTypes } from 'react';
import { assemble, toDispatchEventDictionary } from 'engine/react';
import { createEngine } from 'engine';
import GifViewer from './component';
import consumer from './consumer';
import reducer from './reducer';
import transformer from './transformer';
import * as service from './service';
import Msg from './messages';

const mapStateToProps = (state) => (state);
const mapEventsToProps = {
  onRequestMore: Msg.GIF_REQUESTED,
}::toDispatchEventDictionary();
const provideDependencies = () => ({
  service,
});

const AssembledGifViewer = assemble({
  engineFactory(engineOptions) {
    return createEngine({
      ...engineOptions,
      transformer,
      consumer,
      reducer,
    });
  },
  mapStateToProps,
  mapEventsToProps,
  provideDependencies,
})(GifViewer);

AssembledGifViewer.propTypes = {
  ...AssembledGifViewer.propTypes,
  topic: GifViewer.propTypes.topic,
  onNewGif: PropTypes.func,
};

export default AssembledGifViewer;
