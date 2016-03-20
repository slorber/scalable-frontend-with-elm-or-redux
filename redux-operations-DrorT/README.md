# Solution with Scalable frontend, with Elm or Redux using **Redux Operations**

# redux-operations package

- The original package is at - https://github.com/mattkrick/redux-operations which combines ideas that myself and Matt had
- General description and idea behind it can be found at - https://medium.com/@matt.krick/solving-redux-s-shortcoming-in-150-locs-540979ce6cf9#.6kl8l9dic

# general ideas -
- reducers define an API (can be founed at the API section of the state)
- each reducer can define functions to be called for specific dispatch calls
- priority decides the order of actions to be called
- data is past from one reducer to another as they are called for a specific dispatch
- reducer functionality is not limited to its "standard" location in state and can be changed by defining a location the reducer/component affect - for example the pair of Random Gifs works by using a normal RandomGif component and giving it a different location in state

# Two solutions for the challenge -

# Common to both solutions -
- counter is used from our redux-operations example at https://github.com/mattkrick/redux-operations-counter-example, so it has more functions than a regular actions
- components reusability is simple and allow for more flexibility and less code written, also reduces amounts of data needed to be passed from component to child components
- the pair of random gifs and the two pairs are simply created by using the RandomGif component and pointing at different locations in the state
- the update button for each RandomGif component dispatches the UPDATE_GIF action, which calls an async fetch and on data received calls NEW_GIF
- on NEW_GIF the randomGif reducer is called to update the image source
- **async** - is written as part of the reducer and invoked as part and not in middleware, so that all application logic is in the reducers

# 1. action chaining
In this solution we use redux-operations ability to call different functions from different reducers to the same action in a specific order passing one function result to the next
- on NEW_GIF action after the randomGif reducer is called the button reducer is called, making no change to state but is used so that the counter reducer can get access to the button state
- last the counter reducer is called (on the same NEW_GIF action) and using the button state passed through the action.meta decides by how much to increase the counter value

# Observations for 1st solution
- RandomGif component is not aware of any of the rest of the implementation
- Button is only aware of a UPDATE_GIF call, does not know what it does or how it connects to everything
- Counter listens to the UPDATE_GIF call and has the addition implementation
- The API section of the state gives a clear view of how the different reducers react to each action, in what order, and even details about expected arguments

# 2. component location
- Redux-opertaions allows for components and the reducers they call through dispatch to act on specific location in the state, so we create part of the state of the following structure (with given defualts):
{
    gifCounter:{
        counter: 0,
        button: false
    }
}
- Than we point a regular counter to use location ["gifCounter","counter"] and a regular button to ["gifCounter","button"]
- a new reducer is added called gifCounter - this reducer listens to UPDATE_GIF action and when called uses the counter and button values in its state to increase the counter.

# Observations for 2nd solution
- Both counter and button do not need to know about each other, the gifCounter reducer or the different RandomGif components.
- Each component can be written by completely different groups, knowledge of how the components/reducers work together is only at the APP level and the gifCounter reducer.


