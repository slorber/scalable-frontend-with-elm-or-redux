import {connect} from 'react-redux';
import {RandomGif} from 'modules/randomGif';

export default connect(
  (state) => ({
    model: state.randomGif,
  })
)(RandomGif);
