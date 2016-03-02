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

The counter value should be incremented everytime a `NEW_GIF` action is fired from any NewGif component, no matter the nesting, but the incrementation amount is not fixed.

**Business rule**: 
```
if ( ( counter above 10 ) && ( button is active ) ) { 
  increment by 2 
} 
else { 
  increment by 1 
}
```

#### 4) The 3 components should be decoupled

The 3 components (NewGif/Counter/Button) should be totally decoupled and not see each others in any way. 
They can't import stuff from each others. 
Ideally, in a JS based solutions, one could be able to publish each 3 components in separate NPM packages that don't depend on each others.


# Good luck

I don't have yet a solution for this problem but would be happy to see any proposal to solve this problem. 
I'd like to see solutions in any language (JS / ES6 / Elm / Typescript ...) or tech (Elm / Redux / Cycle / ...)

# Hints

Here are just some ideas I or some others had on how this problem can be solved.

- [Use sagas](https://github.com/slorber/scalable-frontend-with-elm-or-redux/issues/1)
- [Use 2 mailboxes/addresses/action types](https://github.com/slorber/scalable-frontend-with-elm-or-redux/issues/2)

# Submit your solution

If you would like to propose your solution, don't hesitate to.

- Give a good name to your solution. For me something like `redux-elmish-saga-slorber` or `elm-2mailboxes-slorber`
- Create an issue with your solution name, to get feedbacks
- Make a pull request, create a folder with your solution name
