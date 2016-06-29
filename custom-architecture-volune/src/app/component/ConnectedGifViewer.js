import { connect, toDispatchEventDictionary } from 'engine/react';
import GifViewer from 'modules/GifViewer';
import Msg from '../messages';

const mapEventsToProps = {
  onNewGif: Msg.GIF_RECEIVED,
}::toDispatchEventDictionary();

export default connect({
  mapEventsToProps,
})(GifViewer);
