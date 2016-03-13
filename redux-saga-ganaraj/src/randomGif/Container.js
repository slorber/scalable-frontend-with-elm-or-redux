import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import localState from '../localState';

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
    isPending: state.gif[ownProps.selector].isPending,
    imageUrl: state.gif[ownProps.selector].imageUrl
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
)(Component));
