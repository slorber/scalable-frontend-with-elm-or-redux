import { connect, toDispatchEventDictionary } from 'engine/react';
import GifList from 'modules/GifList';
import Msg from '../messages';

const mapEventsToProps = {
  onNewGif: Msg.GIF_RECEIVED,
}::toDispatchEventDictionary();

export default connect({
  mapEventsToProps,
})(GifList);
