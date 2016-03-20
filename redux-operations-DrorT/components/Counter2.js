import React, { Component, PropTypes } from 'react'
import {walkState} from 'redux-operations';
import {increment, incrementAsync, decrement, incrementIfOdd, setCounter, setFromFetch, counter} from '../ducks/counter2';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    counter: props.location ? walkState(props.location, state, counter) : state.counter
  }
};

@connect(mapStateToProps)
export default class Counter extends Component {
  render() {
    const { location, counter, dispatch } = this.props;
    return (
      <div>
        <p>
          Value: {counter} times
          {' '}
          <button onClick={() => dispatch(increment(location, 'counter'))}>+</button>
          {' '}
          <button onClick={() => dispatch(decrement(location, 'counter'))}>-</button>
          {' '}
          <button onClick={() => dispatch(incrementIfOdd(location, 'counter'))}>+ if odd</button>
          {' '}
          <button onClick={() => dispatch(incrementAsync(location, 'counter'))}>Async +</button>
          {'   '}
          <button onClick={() => dispatch(setFromFetch(location, 'counter'))}>Fetch random promise</button>
          {'   '}
          <input type="text" ref="setInput" size="3" defaultValue="0"/>
          <button onClick={() => dispatch(setCounter(this.refs['setInput'].value,location, 'counter'))}>Set input</button>
          {' '}
        </p>
      </div>
    )
  }
}
