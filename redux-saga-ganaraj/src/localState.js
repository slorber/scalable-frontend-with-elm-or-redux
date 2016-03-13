import React, {Component, PropTypes, createElement} from 'react';
import {connect} from 'react-redux';

export const INITIALISE_COMPONENT_STATE = 'INITIALISE_COMPONENT_STATE';
export const REMOVE_COMPONENT_STATE = 'REMOVE_COMPONENT_STATE';

const initialiseComponentState = (selector) => {
  return {
    type: INITIALISE_COMPONENT_STATE,
    selector
  };
};

const removeComponentState = (selector) => {
  return {
    type: REMOVE_COMPONENT_STATE,
    selector
  };
};

class LocalStateComponent extends Component {
  componentWillMount() {
    this.props.initComponentState(this.props.selector);
  }

  componentWillUnmount() {
    this.props.removeComponentState(this.props.selector);
  }

  render() {
    const {component, componentProps, selector} = this.props;
    return createElement(component, {selector, ...componentProps});
  }
}

LocalStateComponent.propTypes = {
  initComponentState: PropTypes.func.isRequired,
  removeComponentState: PropTypes.func.isRequired,
  selector: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  componentProps: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    initComponentState: (selector) => dispatch(initialiseComponentState(selector)),
    removeComponentState: (selector) => dispatch(removeComponentState(selector))
  };
}

const ConnectedLocalStateComponent = connect(mapStateToProps, mapDispatchToProps)(LocalStateComponent);

const localState = (component) => {
  return ({selector, ...rest}) => {
    return (<ConnectedLocalStateComponent
                selector={selector}
                component={component}
                componentProps={rest}
            />);
  };
};

export default localState;
