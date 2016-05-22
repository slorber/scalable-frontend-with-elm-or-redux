I've done this challenge and also included a Dynamic List of Random Gif to demonstrate how composable is this way.
I've choosen `deku` (v2) because it is a small, focused library and this enabled me to easily create `deku-override`.

Let me briefily illustrate this small app.
We have a `Main` component that will manage all of the construction and interaction between the others.
We have 3 simple components, the "things" that "do stuffs": `RandomGif`, `Button` and `Counter`
And 3 "sugar" component that glue "meta" and "things": `RndGifPair`, `RndGifPairPair`, `RndGifList`

And then, the most interesting ones, the 3 "meta" components:
- `Pair`: let us define a pair of something
- `List`: let us define a dynamic list of something
- `Unique`: useful when you have two components of the same kind and each one should be unique. (the pair and the pair-pair of random gifs have both `Pair` in the top level)

All of this are totally abstract, just containers as much as your array is. Totally decoupled from their contents.
They uses `deku-override`, a modification of `deku` that let us easily override the `dispatch` method passed to each component, hence we can wrap the original `action` in a meta action, usually called `itemAction`. All this process is streamlined by some helper functions, such as `deku-override.override`, `utils/meta-reducers.metaStateReducer`, etc...
Every "meta" component has a `makeReducer` function, used by the sugar components to create the final `reducer`. It needs at least the basic `reducer`, to which will be delegate all the original actions wrapped in the `itemAction`.
Let's use the RndPair as an example:

- You click `More please`
- The `RndGif` component than generate a `NEW_GIF` action
- The `Pair` component intercept it, take note of whom of its children dispatched it and then wrap this `key` and original action in an `ITEM_ACTION`
- This new action then traverse the middlewares and hit the main `taskReducer`
- The action is than forwarded to the random gif pair reducer, that will:
  - Read the `key` and take the state of the child that generated it
  - Unwrap the action and pass `NEW_GIF` to the random gif `taskReducer`

This can seems a little complex, but it is not, really. This is the definition of the random gif pair's `taskReducer`:
```javascript
import { makeTaskReducer } from '../pair/reducers'
import * as rnd from '../rndgif/reducers'
const taskReducer = makeTaskReducer(rnd.taskReducer)
```
There's no repition of logic nor manual forwarding of anything.

Another bits of interest are the `taskReducer` and the `obeserver`.
The `taskReducer` will manage all the business logic and side-effects, while I used the `observer` to effectively decouple the `Counter` and all the other components. Please notice that the `observer` just dispatch a trigger action, then will be the `Main` component's `taskReducer` to manage the logic.

That's all! Comparing with the current proposed solutions I had the pleasure to read, I think this is the most decoupled one.
Please notice that each and any part of this application could be managed by a separate team once the interfaces are defined.
