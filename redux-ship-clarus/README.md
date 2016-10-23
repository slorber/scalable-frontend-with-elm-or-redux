# Redux Ship
> Implementation using [Redux Ship](https://github.com/clarus/redux-ship)

[Online demo](http://clarus.github.io/redux-ship/examples/scalable-frontend-with-elm-or-redux)

Run:
```
npm install
npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Idea
The main idea for the composition in Redux Ship is to separate the actions modifying the Redux state into two categories:
* the patches, which represent elementary and local updates;
* the commits, which are a set of patches applied at the same time.

The aim of this separation is to be more explicit about what we are doing. The naming commit / patch is an analogy with Git: a commit represents the "what", a patch represent the "how". Another difference is that there can be many patches into a commit (as many as modified files).

For example, when we get a new gif url, we emit the single commit:
```js
yield* Ship.commit({
  type: 'LoadSuccess',
  gifUrl,
});
```
which is then translated into a patch by the function `applyCommit`, to both update the image and increment the counter:
```js
export function applyCommit(state: State, commit: Commit): Patch {
  switch (commit.type) {
  case 'LoadStart':
    return {randomGif: commit};
  case 'LoadSuccess':
    return {
      counter: state.counter.count >= 10 && state.button.status === 'green' ?
        {type: 'IncrementByTwo'} :
        {type: 'IncrementByOne'},
      randomGif: commit,
    };
  default:
    return {};
  }
}
```
Let us say that we get the following patch:
```js
{
  counter: {type: 'IncrementByOne'},
  randomGif: {
    type: 'LoadSuccess',
    gifUrl: 'http://media0.giphy.com/media/10rW4Xw9eO0RmU/giphy.gif',
  }
}
```
This patch is formed of two sub-patches, `counter` and `randomGif`, which are dispatched to their corresponding reducers.

To compose two random gif components into a pair, we use a mechanism similar to the Elm architecture with a `map` function lifting a sub-component to the parent level:
```js
return yield* Ship.map(
  commit => ({type: 'First', commit}),
  state => ({
    button: state.button,
    counter: state.counter,
    randomGif: state.randomGifPair.first,
  }),
  RandomGifController.control(action.action)
);
```

In the [redux-ship-logger](https://github.com/clarus/redux-ship-logger), the load of a new gif in the pair component shows both a commit:
```js
{
  "type": "RandomGifPair",
  "commit": {
    "type": "First",
    "commit": {
      "type": "LoadSuccess",
      "gifUrl": "http://media4.giphy.com/media/a34HjLEsKchWM/giphy.gif"
    }
  }
}
```
and a patch:
```js
{
  "counter": {
    "type": "IncrementByOne"
  },
  "randomGifPair": {
    "first": {
      "type": "LoadSuccess",
      "gifUrl": "http://media4.giphy.com/media/a34HjLEsKchWM/giphy.gif"
    }
  }
}
```
Doing so, we aim to explicit the fact that we:
* reuse a component into another component (there is a commit in the the commit);
* have a component which modifies two sub-states (the patch is formed of two sub-patches).
