import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: false
        }
        this._toggle = this._toggle.bind(this);
    }
    _toggle() {
        this.setState({ toggled: !this.state.toggled })
    }
    render() {
        const toggled = this.state.toggled;
        return <button onClick={this._toggle}>
            {toggled ? "green" : "red"}
        </button>;
    }
    buttonState() {
        return this.state.toggled;
    }
}

export {
    App
}
