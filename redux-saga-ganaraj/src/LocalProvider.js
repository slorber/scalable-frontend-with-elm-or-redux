import React, {createElement, Component} from 'react';
import Provider from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const callbacks = [];

export const localStateMiddleware = () => {
    return (next) => (action) => {
        let returnValue = next(action);
        callbacks.forEach( (cb) => {
            cb(action);
        });
        return returnValue;
    };
};

const localState = (component, localReducer) => {
  
  class LocalProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.parentStore = context.store;
        this.listener = this.listener.bind(this);
        this.localStore = createStore(localReducer, 
            applyMiddleware(this.listener));
        callbacks.push(this.globalStoreListener.bind(this));
        this.overrideGetState();
        // this.overrideDispatch();
        
    }
    
    overrideDispatch() {
        this.originalLocalDispatch = this.localStore.dispatch;
        
    }
    
    overrideGetState(){
        const oldGetState = this.localStore.getState;
        this.localStore.getState = () => ({
                ...this.parentStore.getState(),
                local: oldGetState()
            });
    }
    
    globalStoreListener(action) {
        if(action.component !== component.displayName) {
            console.log('local dispatch');
            action.component = component.displayName;
            this.localStore.dispatch(action);
        }
        
    }
    
    getChildContext() {
        return { store: this.localStore };
    }
    
    listener() {
        return (next) => (action) => {
            let returnValue = next(action);
            if(action.component !== component.displayName) {
                action.component = component.displayName;
                this.parentStore.dispatch(action);
            }
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