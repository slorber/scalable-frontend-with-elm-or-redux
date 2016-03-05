import {connect} from 'react-redux';
import {Button} from 'modules/button';

export default connect(
  (state) => ({
    model: state.button,
  })
)(Button);
