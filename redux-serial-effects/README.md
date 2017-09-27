## Scalable Frontend with Redux and `redux-serial-effects`

An implementation based on [redux-serial-effects](https://github.com/wix/redux-serial-effects).

`redux-serial-effects` is a middleware for handling side-effects. It listens for state changes and
allows the composition of `subscriber`s, in a similar fashion as `reducers`s, that handle the
invocation of side-effects as required by the changes in state.

In complex apps these `subscriber`s can query 3rd party services and compare the outside world's
state against the internal app state as the basis for deciding on the side-effects needed to sync
the two (actual vs. expected state).

In this simple implementation, the Gif `subscriber` is listening on requests for a new Gif based on
comparing the previous state and the current one, and then triggers a fetch. It doesn't currently
handle failures, but that could easily be accomplished with another action it'll fire that will
update the state into retry mode.

Since both the `reducer` and `subscriber` are equally composable, making the Gif component itself
composable enables us to reuse it easily in all the randomGif components required by this spec. The
component is made composable by supplying it with a state `selector` that passes only the relevant
state slice to each instance, and an action `designator` that wraps dispatch for sending actions
triggered by each copy only to its own reducer.

A small utility is then used to easily make this component both relocatable in the state tree and
repeatable (`encapsulateComponent`). For a real application, this helper should be split into
`relocatableComponent` and `repeatableComponent` helpers.

The counter value is managed by an `onNewGifRequested` handler passed to each Gif instance. It can
also be implemented as a reducer/subscriber where the reducer listens to all NEW_GIF actions,
regardless of the Gif instance that triggered them, and then signals the reducer how the counter
should be incremented. The reducer will then dispatch the correct increment action.
