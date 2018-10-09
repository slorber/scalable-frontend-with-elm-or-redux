# A Scalable Frontend Solution - `fractal-component`

This is an example App demonstrate a scalable frontend solution - [fractal-component](https://github.com/t83714/fractal-component).

The problem of building a scalable frontend application using Redux or Elm has been well described by @slorber [here](https://github.com/slorber/scalable-frontend-with-elm-or-redux/blob/master/README.md)

`fractal-component` prefectly solved this problem by providing a **fully decoupled** component encapsulation mechanism --- a component created using `fractal-component` can be even published as [NPM modules](https://www.npmjs.com/search?q=%40fractal-components%2Frandom-gif) while still enjoy the convenience of predictable global Redux store.

You can actually have a look at the **NPM module version** of this example on [CodePen](https://codepen.io/t83714/pen/yxjgWr) --- see how whole example App's logic is implemented in a single HTML file by pulling UMD version of NPM modules from CDN :-)

How `fractal-component` achieves that? It powers your components with the following features:

- `Multicast` Actions
- Namespaced Actions
- Serializable [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) Action Type 
- `Hot Plug` Redux Reducer & Auto mount / unmount
- `Hot Plug` [Saga](https://redux-saga.js.org/) & Auto mount / unmount
- Namespaced Redux Store
- Auto Component State Management & Redux Store Mapping
- Enhanced Server Side Rendering (SSR) Support

A typical structure of components created by `fractal-component` can be illustrated by the graph below:

![Typical Container Container Component Structure Diagram](https://raw.githubusercontent.com/t83714/fractal-component/master/docs/assets/container-structure.png)

#### Run example App locally

```
npm install
npm start
```

Then, visit `http://localhost:3000/`

#### Giphy.com API key

The exampleApp comes with a testing Giphy.com API key in order to retrieve random Gifs from https://giphy.com/. The api key is limted to **40 requests** per hour.

You can create your own API key from https://developers.giphy.com/ and replace the API key in [Component RandomGif](src/components/RandomGif/index.js)