import React from 'react';
import { connect } from 'react-redux';
import { Container as RandomGif } from '../randomGif';
import * as actions from './actions';
import localState from '../localState';

export const Component = ({ selector, addNewGif, gifList, topic, changeTopic }) => (
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
      {gifList.map(
          (gif) => <RandomGif key={gif.selector}
            selector={gif.selector}/>
          )}
    </div>
)

function mapStateToProps(state, ownProps) {
    return {
        gifList: state.gifList[ownProps.selector].gifs,
        topic: state.gifList[ownProps.selector].topic
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addNewGif: (topic) => dispatch(actions.addNewGif(ownProps.selector, topic)),
        changeTopic: (newTopic) => dispatch(actions.changeTopic(ownProps.selector, newTopic))
    };
}

export default localState(connect(
  mapStateToProps, 
  mapDispatchToProps
)(Component));
