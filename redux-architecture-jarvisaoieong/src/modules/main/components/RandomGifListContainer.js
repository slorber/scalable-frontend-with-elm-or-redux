import {connect} from 'react-redux';
import {RandomGifList} from 'modules/randomGifList';

export default connect(
  (state) => ({
    model: state.randomGifList,
  })
)(RandomGifList);
