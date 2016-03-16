import React from 'react';
import { connect } from 'react-redux';
import { Container as RandomGif } from '../randomGif';
import * as actions from './actions';
import localState from '../LocalProvider';
import reducer from './reducer';

export const Component = ({ addNewGif, gifTopic, topic, changeTopic }) => (
    <div>
      <input value={topic} 
             onChange={(e) => changeTopic(e.target.value)} 
             style={{ width: '200px' }}/>
      <br/>
      <button 
            onClick={() => addNewGif(topic)} 
            style={{ width: '200px' }}>
        Add
      </button>
      {gifTopic.map(
          (topic, index) => <RandomGif topic={topic} key={index}/>
          )}
    </div>
)

function mapStateToProps(state, ownProps) {
    return {
        gifTopic: state.local.gifTopic,
        topic: state.local.currentTopic
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addNewGif: (topic) => dispatch(actions.addNewGif(topic)),
        changeTopic: (newTopic) => dispatch(actions.changeTopic(newTopic))
    };
}

export default localState(connect(
  mapStateToProps, 
  mapDispatchToProps
)(Component),
reducer);
