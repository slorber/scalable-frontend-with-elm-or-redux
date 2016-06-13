import React, { Component } from 'react';
import { NewGif, GifPair, PairPair } from './Gif';
import { App as Button } from './Button';
import { App as Counter } from './Counter';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.onNewGif = this.onNewGif.bind(this);
    }
    onNewGif() {
        const state = this.refs.button.buttonState();
        this.refs.counter.increment(state);
    }
    render() {
        return (
            <div>
                <NewGif onNewGif={this.onNewGif}/>
                <GifPair onNewGif={this.onNewGif}/>
                <PairPair onNewGif={this.onNewGif}/>
                <Button ref="button" />
                <Counter ref="counter" />
            </div>
        );
    }
}
