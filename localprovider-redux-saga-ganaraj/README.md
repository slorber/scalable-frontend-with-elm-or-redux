# Scalable Frontend With Redux and Sagas

This project is an attempt to address the problem raised at
[slorber/scalable-frontend-with-elm-or-redux](https://github.com/slorber/scalable-frontend-with-elm-or-redux)
by [@sebastienlorber](https://twitter.com/sebastienlorber).

**Note:** The overall application and some code ( Components ) were copied over from 
Jaysoo's implementation - but the architecture is completely different between 
the two implementations.

## Notable Differences

One of the things I had to invent to make this architecture happen is the **LocalProvider**.
This is a Provider higher order component that provides the store to all its children 
through the context. In this respect its quite similiar to the *Original* Redux Provider.
The important difference is that it allows you to have *local* state maintained in a
Redux store. There are multiple stores ( kind of a store hierarchy! ) but all dispatched
actions are *listenable* at the global store. This allows local isolated modifications
while also allowing *global* signalling mechanism. It works exactly
the same as using *setState* but with the added benefit of being able to move any component
from a local state to a global state with very few changes.  

## Downsides

- The complete application state is not *currently* serializable ( atleast completely! ).
- Its not possible to react to *local* changes in other *local* locations.

## Running App

```
npm install
npm start
```

Browse to [http://localhost:8080](http://localhost:8080), and see the
"Real World" Example at the very bottom of the page.

- The GIFs section allows you to add a GIF for the entered topic.
- The toggle button can be *on* or *off*.
- The counter can be *incremented* or *decremented*.
- Whenever a new GIF is fetched (either by adding or requesting more),
  the counter is incremented by *1* if button is off or `counter < 10`,
  otherwise it is incremented by *2*.

