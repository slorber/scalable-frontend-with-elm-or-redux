import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import localState from '../LocalProvider';
import reducer from './reducer';
import saga from './saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware(saga)

export class Component extends React.Component {

  constructor(props){
      super(props);
      this.getNewGif = this.getNewGif.bind(this);
  }
  componentDidMount() {
    this.getNewGif();
  }

  renderImage(){
    const {isPending, imageUrl} = this.props;
    if(isPending) {
      return (<span>Loading...</span>);
    }
    else{
      return (<img src={imageUrl} style={{ width: '200px' }}/>);
    }
  }

  getNewGif(){
    const { topic, requestNewGif } = this.props
    requestNewGif(topic);
  }

  render() {
    const {topic} = this.props
    return (
      <div style={{ width: '200px' }}>
        <p><strong>Topic:</strong> {topic}</p>
        <div style={{ minHeight: '150px', display:
          'flex', alignItems: 'center', justifyContent: 'center' }}>
          {this.renderImage()}
        </div>
        <button onClick={this.getNewGif} style={{ width: '200px' }}>
          More
        </button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isPending: state.local.isPending,
    imageUrl: state.local.imageUrl
  }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestNewGif: (topic) => dispatch(actions.requestNewGif(ownProps.selector, topic))
    };
}

export default localState(connect(
  mapStateToProps,
  mapDispatchToProps
)(Component),
'randomgif',
reducer,
[sagaMiddleware]
);
