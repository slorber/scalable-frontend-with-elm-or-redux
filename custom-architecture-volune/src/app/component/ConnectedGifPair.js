import { connect, toDispatchEventDictionary } from 'engine/react';
import GifPair from 'modules/GifPair';
import Msg from '../messages';

const mapEventsToProps = {
  onNewGif: Msg.GIF_RECEIVED,
}::toDispatchEventDictionary();

export default connect({
  mapEventsToProps,
})(GifPair);
