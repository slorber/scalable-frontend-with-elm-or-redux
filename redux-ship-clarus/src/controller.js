// @flow
import * as Ship from 'redux-ship';
import * as RandomGifController from './random-gif/controller';
import * as RandomGifPairController from './random-gif-pair/controller';
import * as Model from './model';

export type Action = {
  type: 'RandomGif',
  action: RandomGifController.Action,
} | {
  type: 'RandomGifPair',
  action: RandomGifPairController.Action,
};

export type Commit = {
  type: 'RandomGif',
  commit: RandomGifController.Commit,
} | {
  type: 'RandomGifPair',
  commit: RandomGifPairController.Commit,
};

export type State = Model.State;

export type Patch = Model.Patch;

export function applyCommit(state: State, commit: Commit): Patch {
  switch (commit.type) {
  case 'RandomGif': {
    const patch = RandomGifController.applyCommit(
      {counter: state.counter, randomGif: state.randomGif},
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGif && {randomGif: patch.randomGif},
    };
  }
  case 'RandomGifPair': {
    const patch = RandomGifPairController.applyCommit(
      {counter: state.counter, randomGifPair: state.randomGifPair},
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGifPair && {randomGifPair: patch.randomGifPair},
    };
  }
  default:
    return {};
  }
}

export function* control(action: Action): Ship.Ship<*, Commit, State, void> {
  switch (action.type) {
  case 'RandomGif':
    return yield* Ship.map(
      commit => ({type: 'RandomGif', commit}),
      state => ({
        counter: state.counter,
        randomGif: state.randomGif,
      }),
      RandomGifController.control(action.action)
    );
  case 'RandomGifPair':
    return yield* Ship.map(
      commit => ({type: 'RandomGifPair', commit}),
      state => ({
        counter: state.counter,
        randomGifPair: state.randomGifPair,
      }),
      RandomGifPairController.control(action.action)
    );
  default:
    return;
  }
}
