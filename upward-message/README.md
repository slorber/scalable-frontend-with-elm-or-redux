# Approach

This version blatantly copies Peter's as a basis.

Instead of intercepting subcomponent events at the top, this approach passes an address down to the components for them to send a message when a new GIF is obtained. The main watches this signal and increments the counter each time it gets a message.

# Details

The Main module has a new `actionsMailbox` whose signal feeds into `app.inputs`.

The Main `update` function passes a new context parameter to the `update` function of each component. The subcomponents will send a message to that address each time they update a GIF. The main function forwards that address such that the resulting messages become the `SomeGifUpdated` action.

The fundamental NewGif component has a new effect in its `NewGif` case which sends a `()` message to the context that it received from its parent.

The composite components pass down the context that they get to their subcomponents. The existing `Effects.map` functions suffice to return the new message up through the component tree to the ultimate parent.

The main gets the message sent from the NewGif component (via an effect passed up the component tree). That comes in to its update function as `SomeGifUpdated`. It updates the Counter in response. The counter-update work appears in just this one place rather than having to be done in each other action for the various components.
