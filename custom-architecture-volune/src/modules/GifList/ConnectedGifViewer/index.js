import { connect, toDispatchEventDictionary } from 'engine/react';
import GifViewer from 'modules/GifViewer';
import Msg from '../messages';

const mapEventsToProps = {
  onNewGif: Msg.GIF_RECEIVED,
}::toDispatchEventDictionary();

const ConnectedGifViewer = connect({
  mapEventsToProps,
})(GifViewer);

ConnectedGifViewer.propTypes = {
  ...ConnectedGifViewer.propTypes,
  topic: GifViewer.propTypes.topic,
};

export default ConnectedGifViewer;
