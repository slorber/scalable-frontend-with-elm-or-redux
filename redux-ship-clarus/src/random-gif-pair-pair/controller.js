// @flow
import * as Ship from 'redux-ship';
import * as ButtonModel from '../button/model';
import * as CounterModel from '../counter/model';
import * as RandomGifPairController from '../random-gif-pair/controller';
import * as RandomGifPairPairModel from './model';

export type Action = {
  type: 'First',
  action: RandomGifPairController.Action,
} | {
  type: 'Second',
  action: RandomGifPairController.Action,
};

export type Commit = {
  type: 'First',
  commit: RandomGifPairController.Commit,
} | {
  type: 'Second',
  commit: RandomGifPairController.Commit,
};

export type State = {
  button: ButtonModel.State,
  counter: CounterModel.State,
  randomGifPairPair: RandomGifPairPairModel.State,
};

export type Patch = {
  counter?: CounterModel.Patch,
  randomGifPairPair?: RandomGifPairPairModel.Patch,
};

export function applyCommit(state: State, commit: Commit): Patch {
  switch (commit.type) {
  case 'First': {
    const patch = RandomGifPairController.applyCommit(
      {
        button: state.button,
        counter: state.counter,
        randomGifPair: state.randomGifPairPair.first
      },
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGifPair && {randomGifPairPair: {first: patch.randomGifPair}},
    };
  }
  case 'Second': {
    const patch = RandomGifPairController.applyCommit(
      {
        button: state.button,
        counter: state.counter,
        randomGifPair: state.randomGifPairPair.second
      },
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGifPair && {randomGifPairPair: {second: patch.randomGifPair}},
    };
  }
  default:
    return {};
  }
}

export function* control(action: Action): Ship.Ship<*, Commit, State, void> {
  switch (action.type) {
  case 'First':
    return yield* Ship.map(
      commit => ({type: 'First', commit}),
      state => ({
        button: state.button,
        counter: state.counter,
        randomGifPair: state.randomGifPairPair.first,
      }),
      RandomGifPairController.control(action.action)
    );
  case 'Second':
    return yield* Ship.map(
      commit => ({type: 'Second', commit}),
      state => ({
        button: state.button,
        counter: state.counter,
        randomGifPair: state.randomGifPairPair.second,
      }),
      RandomGifPairController.control(action.action)
    );
  default:
    return;
  }
}
