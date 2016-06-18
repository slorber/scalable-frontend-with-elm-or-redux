import React, { Component } from 'react';
import { engineType } from './propTypes';
import { ensureIsFunction } from './helpers';

const DEFAULT_MERGE_PROPS = (stateProps, callbackProps, ownProps, engine) =>
  (Object.assign({ engine }, ownProps, stateProps, callbackProps));

const RETURN_NO_PROPS = () => ({});

const getDisplayName = (WrappedComponent) =>
  (WrappedComponent.displayName || WrappedComponent.name || 'Component');

export default function connect({
  mapStateToProps = RETURN_NO_PROPS,
  mapEventsToProps = RETURN_NO_PROPS,
  mergeProps = DEFAULT_MERGE_PROPS,
}) {
  ensureIsFunction(mapStateToProps, 'mapStateToProps');
  ensureIsFunction(mapEventsToProps, 'mapEventsToProps');

  return (WrappedComponent) => {
    class ConnectedComponent extends Component {
      constructor(props, context) {
        super(props, context);
        this.engine = props.engine || context.engine;

        const dispatch = (...args) => this.engine.dispatch(...args);
        const getEmitterProps = () => this.props;

        this.callbackProps = mapEventsToProps({
          dispatch,
          getEmitterProps,
        });

        const state = this.engine.getState();
        const stateProps = mapStateToProps(state, props);
        this.state = mergeProps(stateProps, this.callbackProps, props, this.engine);
      }

      componentDidMount() {
        this.subscription = this.engine.subscribe(this.updatePropsFromState);
      }

      componentWillReceiveProps(newProps) {
        if (this.props !== newProps) {
          const state = this.engine.getState();
          const stateProps = mapStateToProps(state, newProps);
          this.setState(mergeProps(stateProps, this.callbackProps, newProps, this.engine));
        }
      }

      shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
      }

      componentWillUnmount() {
        this.subscription.unsubscribe();
        this.subscription = null;
      }

      updatePropsFromState = () => {
        const state = this.engine.getState();
        const stateProps = mapStateToProps(state, this.props);
        this.setState(mergeProps(stateProps, this.callbackProps, this.props, this.engine));
      };

      render() {
        const mergedProps = this.state;
        return (<WrappedComponent {...mergedProps} />);
      }
    }

    ConnectedComponent.displayName = `ConnectedComponent(${getDisplayName(WrappedComponent)})`;
    ConnectedComponent.propTypes = {
      ...(WrappedComponent.propTypes || {}),
      engine: engineType,
    };
    ConnectedComponent.contextTypes = {
      ...(WrappedComponent.contextTypes || {}),
      engine: engineType,
    };

    return ConnectedComponent;
  };
}
