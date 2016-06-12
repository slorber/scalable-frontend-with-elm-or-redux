# Scalable frontend, with React/Redux/Whatever-react-based-library-you-want

This feels a little bit like cheating, but given the problem definition, especially the emphasis on decoupling, I thought that perhaps there's no need to force each component to be implemented with Redux, Redux + redux-thunk, Redux + Sagas, Mobx, whatever.

Instead, each component is rendered as an "opaque" React component. They are opaque in that the integration team has no idea *how* each other team has implemented their component (or even really care), they just have to implement a defined business-level interface (exposed as a React component).

One drawback of this approach is that you no longer have a single state atom, but if you're really serious about decoupling, this is a plus, right? ;) Any state sharing between components needs to become explicit, but not so convenient...

One interesting thing about this approach (that may also be true of the other approaches, I haven't studied them closely) is that it could easily support having *N counters* and *N buttons*. The integration team could wire them up however they like.

# Interfaces

1. A `NewGif` type component must take an `onNewGif` prop, that is a function of type `() => void`.

2. A `Button` component must have a function `buttonState`, of type `() => bool`, that returns the button's state ("active" => `true`).

3. A `Counter` component must have a function `increment` of type `bool => void`, that will increment the counter. The interface does not specify whether the `Counter` implements the business rule, as this is an internal detail that should be hidden from the user of the component.

# Implementation

`NewGif` is implemented as a Redux app that will, when the button is pressed:

1. Fetch gif metadata from the Giphy API.
2. Dispatch `NEW_GIF` into its own store (which will cause the `connect`ed `Gif` component to update with the new gif URL.
3. Call the function passed as `onNewGif` to signal that the gif was changed.

`GifPair` and `PairPair` are basically dumb components that pass their `onNewGif` props straight through to the child `NewGif`.

`Button` is a plain React component that stores its button's state in the React component state. It exposes the button state via a function on the class `buttonState`.

`Counter` is also implemented as a Redux app that has a single Redux action: `INC`, that has `buttonState` as the payload. The ability to trigger a dispatch of this action is exposed to users of the component via the `increment` function on the component. The business rule is implemented in the reducer, with `counter` coming from the state, and `buttonState` coming from the action.

`App` wires the components together by:

1. Keeping a ref to the counter and the button.
2. Providing a function as the `onNewGif` prop of any Gif-like component (`NewGif`, `GifPair`, `PairPair`) that gets the button state via the ref, and trigges the counter increment (again via a ref), passing along the button state.
