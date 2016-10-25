// @flow
import * as Ship from 'redux-ship';
import * as ButtonModel from './button/model';
import * as RandomGifController from './random-gif/controller';
import * as RandomGifPairController from './random-gif-pair/controller';
import * as RandomGifPairPairController from './random-gif-pair-pair/controller';
import * as Model from './model';

export type Action = {
  type: 'Button',
  action: ButtonModel.Patch,
} | {
  type: 'RandomGif',
  action: RandomGifController.Action,
} | {
  type: 'RandomGifPair',
  action: RandomGifPairController.Action,
} | {
  type: 'RandomGifPairPair',
  action: RandomGifPairPairController.Action,
};

export type Commit = {
  type: 'Button',
  commit: ButtonModel.Patch,
} | {
  type: 'RandomGif',
  commit: RandomGifController.Commit,
} | {
  type: 'RandomGifPair',
  commit: RandomGifPairController.Commit,
} | {
  type: 'RandomGifPairPair',
  commit: RandomGifPairPairController.Commit,
};

export type State = Model.State;

export type Patch = Model.Patch;

export function applyCommit(state: State, commit: Commit): Patch {
  switch (commit.type) {
  case 'Button':
    return {
      button: commit.commit,
    };
  case 'RandomGif': {
    const patch = RandomGifController.applyCommit(
      {
        button: state.button,
        counter: state.counter,
        randomGif: state.randomGif
      },
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGif && {randomGif: patch.randomGif},
    };
  }
  case 'RandomGifPair': {
    const patch = RandomGifPairController.applyCommit(
      {
        button: state.button,
        counter: state.counter,
        randomGifPair: state.randomGifPair
      },
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGifPair && {randomGifPair: patch.randomGifPair},
    };
  }
  case 'RandomGifPairPair': {
    const patch = RandomGifPairPairController.applyCommit(
      {
        button: state.button,
        counter: state.counter,
        randomGifPairPair: state.randomGifPairPair
      },
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGifPairPair && {randomGifPairPair: patch.randomGifPairPair},
    };
  }
  default:
    return {};
  }
}

export function* control(action: Action): Ship.Ship<*, Commit, State, void> {
  switch (action.type) {
  case 'Button':
    return yield* Ship.map(
      commit => ({type: 'Button', commit}),
      state => state.button,
      Ship.commit(action.action)
    );
  case 'RandomGif':
    return yield* Ship.map(
      commit => ({type: 'RandomGif', commit}),
      state => ({
        button: state.button,
        counter: state.counter,
        randomGif: state.randomGif,
      }),
      RandomGifController.control(action.action)
    );
  case 'RandomGifPair':
    return yield* Ship.map(
      commit => ({type: 'RandomGifPair', commit}),
      state => ({
        button: state.button,
        counter: state.counter,
        randomGifPair: state.randomGifPair,
      }),
      RandomGifPairController.control(action.action)
    );
  case 'RandomGifPairPair':
    return yield* Ship.map(
      commit => ({type: 'RandomGifPairPair', commit}),
      state => ({
        button: state.button,
        counter: state.counter,
        randomGifPairPair: state.randomGifPairPair,
      }),
      RandomGifPairPairController.control(action.action)
    );
  default:
    return;
  }
}
