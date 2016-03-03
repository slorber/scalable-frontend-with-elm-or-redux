# Features

- Basic components (`Button`, `Counter`, `RandomGif`) are decoupled. They are not augmented or expose a specific interface in order to solve this challenge
- Compound components (`RandomGifPair`, `RandomGifPairOfPair`) are assembled using a general and reutilisable `compose` function
- The only allowed way to comunicate with `Counter` is via its event `Increment(step)`
- Business logic is put entirely into `Main`
- `Main`'s rendering tree is a binary tree (via the `compose` function) providing a predicatable way to retrieve the state and send events to child components

# Setup

```sh
cd tom-binary-tree
npm install
npm run build
open dist/index.html
```