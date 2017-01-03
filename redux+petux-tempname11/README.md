This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Redux + Petux solution

* [Petux](https://github.com/tempname11/petux)
* [Online demo](http://petux-solution-for-scalable-arch.surge.sh/)

This solution uses [Petux](https://github.com/tempname11/petux) for side-effects and **flow** for type annotations. I'm really happy with how the code turned out.

* All the sub-components (`Button`, `Counter`, `RandomGif`, `Pair`) are entirely decoupled.
* `Pair` is higher-order, and can be applied to any component...
* ...including `App` itself: for fun, it's been applied to it at the top level.
* The "business rule" has been encapsulated in the `App` reducer entirely. Basically, it intercepts effects from lower reducers, and increments the counter, when a "REQUEST_NEW_GIF" effect is encountered.
* Turns out that **flow**, with the right usage, can do very thorough type checks, even with higher-order stuff. The annotations a bit scary-looking at times, though.
