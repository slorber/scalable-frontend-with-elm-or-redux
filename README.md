# Scalable frontend, with Elm or Redux

Thanks to everyone trying to solve the problem.

# Intro

The point of this specification is to see how we can build a scalable frontend architecture.

The specification remains simple compared to real-world applications, but it is meant to be kind of **painful for both Redux and Elm** to solve :)

This repository was created after discussions on [this issue](https://github.com/jarvisaoieong/redux-architecture/issues/1). 
Check it out, there are some proposed implementations that are worth checking.

What we don't try to solve here: tooling, css, ajax requests, performance...

#### Some observations:

- Nested actions of Elm seems perfect for local component state but non-local interactions is not so easy
- Flat actions of Flux/Redux seems perfect for global app state, but people still rely a lot on React `this.setState` for local component state.

None of these two approaches seems perfect to me. But can we have the best of both worlds?

# Specification

It is based on the famous RandomGif ( [JS](https://github.com/jarvisaoieong/redux-architecture) / [Elm](https://github.com/evancz/elm-architecture-tutorial) example that is often used to showcase Elm architecture.

The app should have:

#### 1) A NewGif component used multiple times:

NewGif is the original example component. It is used multiple times inside the app at different places. All the instances are not necessarily close to each others in the DOM tree.

- A top-level RandomGif issuing actions like:
`APP_UPDATED > ... > TOP_LEVEL_RANDOM_GIF_UPDATED > NEW_GIF`

- A pair of RandomGif issuing actions like:
`APP_UPDATED > ... > RANDOM_GIF_PAIR > FIRST_RANDOM_GIF_UPDATED  > NEW_GIF`

- A pair of pair of RandomGif issuing actions like 
`APP_UPDATED > ... > RANDOM_GIF_PAIR_OF_PAIR_UPDATED > FIRST_RANDOM_GIF_PAIR_UPDATED > FIRST_RANDOM_GIF_UPDATED  > NEW_GIF`


#### 2) A button

The button can be active or inactive. It is green when active and red when inactive. Clicking on it toggles its active state (default is inactive).

#### 3) A counter value

The counter value should be incremented everytime a `NEW_GIF` action is fired from any NewGif component, no matter the nesting.

Business rule: if the current counter value is > 10 AND the button is active, then the counter value is incremented by 2 instead of 1.

#### 4) The 3 components should be decoupled

The 3 components (NewGif/Counter/Button) should be totally decoupled and not see each others in any way. 
They can't import stuff from each others. 
Ideally, in a JS based solutions, one could be able to publish each 3 components in separate NPM packages that don't depend on each others.


# Good luck

I don't have yet a solution for this problem but would be happy to see any proposal to solve this problem. 
I'd like to see solutions in any language (JS / ES6 / Elm / Typescript ...) or tech (Elm / Redux / Cycle / ...)

# Hints


Here are just some ideas I have on how this problem can be solved.

#### Use 2 mailboxes/addresses/action types...

NewGif component has a local state, but sometimes something that happens inside this component should trigger local changes but also changes in other places of the app.

Nested actions of Elm works really great for local state, but it's hard to listen for NEW_GIF actions in other components as they are nested. 

In Flux/Redux, actions are not nested, so you can easily listen for `NEW_GIF` actions from anywhere, but it's hard to manage a bunch of nested NewGif components without the ceremony of having to assign each of them an UUID, creating a collection/store/reducer for a list of NewGif components... Many will use `this.setState()` with React and only dispatch `NEW_GIF` when needed because it is more easy to manage.
 
I think we can work on combining these 2 approachs together. Decoupled components could only dispatch local actions that only themselves are aware of, and then a layer above we couple these decoupled components to our app by propagating the local event above the stack (nested event), AND dispatching and global application event (flat).


#### Use Sagas

In the backend world, the saga is a piece of software that permits to coordinate long running transactions (eventual consistency), and transactions across different bounded contexts (domain driven design jargon).

It is gaining popularity in frontend world by with [redux-sagas](https://github.com/yelouafi/redux-saga) from @yelouafi (even if most people only use it now only as a replacement for redux-thunks). [See also](http://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34623840#34623840)

To simplify this for frontend world, imagine there is widget1 and widget2. When some button on widget1 is clicked, then it should have an effect on widget2. Instead of coupling the 2 widgets together (ie widget1 dispatch an action that targets widget2), widget1 only dispatch that its button was clicked. Then the saga listen for this button click and then update widget2 by dispaching a new event that widget2 is aware of.

 The 2 widgets are now bounded contexts that can live separately. They do not need each others to be consistent and can be reused in other apps as well. The saga is the coupling point between the two widgets that coordinate them in a meaningful way for your business.


# Submit your solution


If you would like to propose your solution, don't hesitate to 
- request feedbacks in a github issue related to your proposal
- make a pull request with your final solution
- create a folder with an understandable name. For me something like `redux-elmish-saga-slorber` or `elm-2mailboxes-slorber`
