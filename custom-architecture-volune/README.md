# Custom library solution

## Intro

This is a tentative to provide a scalable architecture, using a custom library (called `engine`
in the code). This is highly inspired by `redux` and relative libraries. It uses `React`.

The custom library is provided with the solution, and does not currently exists anywhere else.

## Concepts

The architecture is inspired by redux, but introduces more elements.
It can be shown by this chain:

```
                                      >==consumer==|
events >==mapper==> >==transformer==>  
                                      >==reducer==> state
```

#### `events`

Events are signals coming from outside of the component:
- User interaction
- Network response
- Call by a parent component
- Callback by a child component
- Scheduled event
- ...

#### `events` and `messages`

Events and Messages are the same thing. the `event` name is used for messages coming from
the outside of a component, the `message` name is mostly used for internal messages.

#### `mapper`

The mapper adapts an event to a message easier to understand by the rest of the chain.
- Get value from DOM event: `{username: event.args[0].currentTarget.value}`
- Get value from child component's props: `{id: event.getEmitterProps().elementId}`

#### `transformer`

The transformer transforms the event into a sequence of messages, describing the internal actions caused by the event.
This is where the business logic is implemented.

#### `consumer`

The consumer produces side effects from the sequence of messages, for example:
- Network call
- Schedule event
- Call callback from component's props
- Logging

#### `reducer`

Inspired by `redux`, the reducer updates the state from the sequence of messages.

## Building a component

A component is composed by the following:
- A main view element, stateless.
- Children elements. Stateless elements, DOM elements, library elements.
- The logic elements: `mapper`, `mapper`, `mapper`, `mapper`. Each of them is optional.
- Glue

### The glue

All the tools that bind the elements into a working component

#### `engine`

The engine is responsible of dispatching events through the logic elements, 
storing the latest version of the state and notifying when the state changes.

#### `assemble`

The `assemble` decorator does the binding between the final component's API, 
the main stateless component, the engine, and some external dependencies.

The decorator is configurable with:
- `mapStateToProps`: How to bind the engine's state to the stateless component's props
- `mapEventsToProps`: How to bind the engine's `dispatch`, and which event, to the stateless component's props (callbacks)
- `mapEventsToMethods`: How to bind the engine's `dispatch`, and which event, to the final component's API
- `provideDependencies`: How to inject dependencies from imported libraries or services
- `mapPropsToDependencies`: How to inject dependencies from the final component's API
- `mapContextToDependencies`: How to inject dependencies from React's context

#### `connect`

The `connect` decorator does the binding between a child component (stateless, DOM, library)
and the engine.

The decorator is configurable with:
- `mapStateToProps`: How to bind the engine's state to the child component's props
- `mapEventsToProps`: How to bind the engine's `dispatch`, and which event, to the child component's props (callbacks)

## Remarks

### Dependencies

Dependencies should only be used by the `consumer`, and only be injected through the `assemble`
decorator. Because of this, any other element should easily be testable.

### Fractal

There is not much difference between an assembled component and the application.
The application is more likely to be responsible of the application/business's state, 
a component is more likely to work with UI state.
In the end, that's all decision of the developer.

An assembled component can be published (for example on npm), and reused in an application
using `redux` or other Flux architecture, or something else.

The only big constraint is the View library. I don't know of existing solution to mix
View libraries, for example an assembled component built with React inside an application
built with Riot.js

### Engine's API

The API of the logic elements is meant to be simple and minimalist. In fact, one can develop
a new engine to use a different API for the logic elements
(for example, to take benefit of RxJS streams).

The only *strong* API is the engine's API:
- A way to identify the type of an event.
  Currently `type` member of plain object messages.
- A way to push an event inside the engine.
  Currently `dispatch` method.
- A way to get the current state from the engine.
  Currently `getState` method.
- A way to observe changes of the state.
  Currently `subscribe` method.
  
This looks a lot like `redux`. Then why not use `redux`?
Because to implement the logic elements, I would have to respect the API of the
enhancers and/or middlewares.

### Current implementation of the `transformer`

I've seen several libraries to find inspiration to implement the `transformer`.
At some point, I realized that it's like a N-N relationship in a database, between 
the incoming event's type and the outgoing message's type.

I then did an analogy with several database schema:
- List the outgoing messages in a column of the event's row.
  More "imperative" way, or like `redux-thunk`
- List the incoming events in a column of the message's row.
  More "functional" way, or like `redux-saga-rxjs`
- List the relationship in a third table with an event and a message columns.
  More "declarative" way, that's what I tried.

I don't think the current implementation of the `transformer` is good. My goal is to challenge the readers
for new ideas. Maybe a small focused language, maybe something else...
