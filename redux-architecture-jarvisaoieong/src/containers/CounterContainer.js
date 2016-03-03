import {connect} from 'react-redux';
import {Counter} from 'modules/counter';

export default connect(
  (state) => ({
    model: state.counter,
  })
)(Counter);
