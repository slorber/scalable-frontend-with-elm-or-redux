import React, {createElement, Component} from 'react';
import Provider from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const localState = (component, localReducer, mws=[]) => {
  
  class LocalProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.parentStore = context.store;
        this.listener = this.listener.bind(this);
        this.localStore = createStore(localReducer, 
            applyMiddleware.apply(null, [this.listener, ...mws]));
        this.overrideGetState();        
    }

    overrideGetState(){
        const localGetState = this.localStore.getState;
        this.localStore.getState = () => ({
                ...this.parentStore.getState(),
                local: localGetState()
            });
    }
    
    getChildContext() {
        return { store: this.localStore };
    }
    
    listener() {
        return (next) => (action) => {
            let returnValue = next(action);
            this.parentStore.dispatch(action);
            return returnValue;
        };
    };
    
    render() {
        return createElement(component, this.props);       
    }
  }  
  LocalProvider.contextTypes = {store: React.PropTypes.object};
  LocalProvider.childContextTypes = {store: React.PropTypes.object};
  return LocalProvider;
};

export default localState;