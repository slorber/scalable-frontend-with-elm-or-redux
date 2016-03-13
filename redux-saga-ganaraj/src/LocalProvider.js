import React, {createElement, Component} from 'react';
import Provider from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';

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

const localState = (component, localReducer, localActions) => {
  
  class LocalProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = context.store;
        this.listener = this.listener.bind(this);
        this.localStore = createStore(localReducer, 
            applyMiddleware(this.listener));
        callbacks.push(this.globalStoreListener.bind(this));
        const oldGetState = this.localStore.getState;
        this.localStore.getState = () => ({
                ...this.store.getState(),
                local: oldGetState()
            });
    }
    
    globalStoreListener(action) {
        if(!localActions.includes(action.type)) {
            this.localStore.dispatch(action);
        }
        
    }
    
    getChildContext() {
        return { store: this.localStore };
    }
    
    listener({getState}) {
        return (next) => (action) => {
            let returnValue = next(action);
            this.store.dispatch(action);
            console.dir(ReactDOM.findDOMNode(this));
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