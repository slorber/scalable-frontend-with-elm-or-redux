import React, { Component, PropTypes } from 'react'
import {walkState} from 'redux-operations';
import { clickButton, button } from '../ducks/button';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
    return {
        button: props.location ? walkState(props.location, state, button) : state.button
    }
};

@connect(mapStateToProps)
export default class Button extends Component {
    render() {
        const { location, button, dispatch } = this.props;
        const style = {
            "background-color": button ? 'green' : 'red'
        };
        const text = button ? "On" : "Off";
        return (
            <div>
                <button onClick={() => dispatch(clickButton(location, 'button'))} style={style}>{text}</button>
            </div>
        )
    }
}
