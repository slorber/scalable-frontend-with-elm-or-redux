import React, { Component, PropTypes } from 'react'
import {walkState} from 'redux-operations';
import { updateGif, randomGif} from '../ducks/randomGif';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    randomGif: props.location ? walkState(props.location, state, randomGif) : state.randomGif
  }
};

@connect(mapStateToProps)
export default class RandomGif extends Component {
  componentWillMount() {
    const { location, dispatch, topic } = this.props;
    dispatch(updateGif(topic,location, 'randomGif'));
  }

  render() {
    const { location, randomGif, dispatch, topic } = this.props;
    const imageStyle = {
      height: "200px",
      width: "300px"
    }
    return (
      <div>
        <p>
          Topic: <input type="text" ref="topic" size="3" defaultValue={topic} size="20"/>
          <button onClick={() => dispatch(updateGif(this.refs['topic'].value,location, 'randomGif'))}>update</button>
          <br />
          <img src={randomGif} style={imageStyle}/>
        </p>
      </div>
    )
  }
}
