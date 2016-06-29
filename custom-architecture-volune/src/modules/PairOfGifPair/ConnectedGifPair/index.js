import { connect, toDispatchEventDictionary } from 'engine/react';
import GifPair from 'modules/GifPair';
import Msg from '../messages';

const mapEventsToProps = {
  onNewGif: Msg.GIF_RECEIVED,
}::toDispatchEventDictionary();

const ConnectedGifPair = connect({
  mapEventsToProps,
})(GifPair);

ConnectedGifPair.propTypes = {
  ...ConnectedGifPair.propTypes,
  topics: GifPair.propTypes.topics,
};

export default ConnectedGifPair;
