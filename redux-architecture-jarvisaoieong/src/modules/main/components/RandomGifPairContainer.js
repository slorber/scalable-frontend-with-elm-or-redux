import {connect} from 'react-redux';
import {RandomGifPair} from 'modules/randomGifPair';

export default connect(
  (state) => ({
    model: state.randomGifPair,
  })
)(RandomGifPair);
