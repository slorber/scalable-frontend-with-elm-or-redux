import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const NEW_GIF = 'NEW_GIF'

const waiting = 'https://raw.githubusercontent.com/jarvisaoieong/redux-architecture/master/src/modules/randomGif/components/waiting.gif';

const getGif = () => fetch('//api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=kittens')
    .then(req => req.json())
    .then(data => data.data.image_url);

const reducer = (s = waiting, a) => {
    switch (a.type) {
    case NEW_GIF:
        return a.gif
    }
    return s
}

const Gif = connect(
    gif => ({ gif })
)(
    ({ gif }) => <img src={gif} />
)

class NewGif extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onNewGif: props.onNewGif,
            store: createStore(reducer)
        }
        this.newGif = this.newGif.bind(this);
    }
    newGif() {
        getGif().then(url => {
            this.state.store.dispatch({ type: NEW_GIF, gif: url });
            if (this.state.onNewGif()) {
                this.state.onNewGif();
            };
        }).catch(err => console.error(err));
    }
    render() {
        const gif = this.state.store.getState();
        return (
            <Provider store={this.state.store}>
                <div>
                    <button onClick={this.newGif}>MOAR</button>
                    <Gif />
                </div>
            </Provider>
        );
    }
}

const GifPair = ({ onNewGif }) =>
    <div style={{border: '1px solid #CCC'}}>
        <h2>Gif Pair</h2>
        <NewGifApp onNewGif={onNewGif} />
        <NewGifApp onNewGif={onNewGif} />
    </div>;

const PairPair = ({ onNewGif }) =>
    <div style={{border: '1px solid #CCC'}}>
        <h2>Gif Pair Pair</h2>
        <GifPair onNewGif={onNewGif} />
        <GifPair onNewGif={onNewGif} />
    </div>;

export {
    NewGif,
    GifPair,
    PairPair
}
