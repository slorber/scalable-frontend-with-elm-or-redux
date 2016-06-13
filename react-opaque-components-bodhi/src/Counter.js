import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const INC = 'INC';

const reducer = (s = 0, a) => {
    if (a.type === INC) {
        if (s >= 10 && a.buttonState) {
            return s + 2;
        } else {
            return s + 1;
        }
    }
    return s;
};

const increment = (buttonState) => ({
    type: INC,
    buttonState
});

const store = createStore(reducer);

const Counter = connect(
    (counter) => ({ counter })
)(({ counter }) =>
    <h1>Counter {counter}</h1>
);

class App extends Component {
    render() {
        return <Provider store={store}>
            <Counter />
        </Provider>
    }
    increment(buttonState) {
        store.dispatch(increment(buttonState));
    }
}

export {
    App
}
