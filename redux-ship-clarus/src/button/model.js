// @flow

export type State = {
  status: 'green' | 'red',
};

export const initialState: State = {
  status: 'green',
};

export type Patch = {
  type: 'Toggle',
};

export function reduce(state: State, patch: Patch): State {
  switch (patch.type) {
  case 'Toggle':
    return {
      ...state,
      status: state.status === 'green' ? 'red' : 'green',
    };
  default:
    return state;
  }
}
