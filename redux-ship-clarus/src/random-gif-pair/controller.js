// @flow
import * as Ship from 'redux-ship';
import * as ButtonModel from '../button/model';
import * as CounterModel from '../counter/model';
import * as RandomGifController from '../random-gif/controller';
import * as RandomGifPairModel from './model';

export type Action = {
  type: 'First',
  action: RandomGifController.Action,
} | {
  type: 'Second',
  action: RandomGifController.Action,
};

export type Commit = {
  type: 'First',
  commit: RandomGifController.Commit,
} | {
  type: 'Second',
  commit: RandomGifController.Commit,
};

export type State = {
  button: ButtonModel.State,
  counter: CounterModel.State,
  randomGifPair: RandomGifPairModel.State,
};

export type Patch = {
  counter?: CounterModel.Patch,
  randomGifPair?: RandomGifPairModel.Patch,
};

export function applyCommit(state: State, commit: Commit): Patch {
  switch (commit.type) {
  case 'First': {
    const patch = RandomGifController.applyCommit(
      {
        button: state.button,
        counter: state.counter,
        randomGif: state.randomGifPair.first
      },
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGif && {randomGifPair: {first: patch.randomGif}},
    };
  }
  case 'Second': {
    const patch = RandomGifController.applyCommit(
      {
        button: state.button,
        counter: state.counter,
        randomGif: state.randomGifPair.second
      },
      commit.commit
    );
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.randomGif && {randomGifPair: {second: patch.randomGif}},
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
        randomGif: state.randomGifPair.first,
      }),
      RandomGifController.control(action.action)
    );
  case 'Second':
    return yield* Ship.map(
      commit => ({type: 'Second', commit}),
      state => ({
        button: state.button,
        counter: state.counter,
        randomGif: state.randomGifPair.second,
      }),
      RandomGifController.control(action.action)
    );
  default:
    return;
  }
}
