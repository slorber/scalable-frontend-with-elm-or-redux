import {connect} from 'react-redux';
import {RandomGifPairOfPair} from 'modules/randomGifPairOfPair';

export default connect(
  (state) => ({
    model: state.randomGifPairOfPair,
  })
)(RandomGifPairOfPair);
