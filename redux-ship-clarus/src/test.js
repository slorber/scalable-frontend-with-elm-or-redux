// @flow
import React from 'react';
import renderer from 'react-test-renderer';

export function dispatch() {
}

export function snapshotComponent<Config>(
  component: ReactClass<Config>,
  configs: {[id: string]: Config}
): void {
  Object.keys(configs).forEach(id => {
    it(id, () => {
      const element = React.createElement(component, configs[id]);
      const tree = renderer.create(element).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
}

export function snapshotReduce<Patch, State>(
  reduce: (state: State, patch: Patch) => State,
  configs: {[id: string]: {patch: Patch, state: State}}
): void {
  Object.keys(configs).forEach(id => {
    it(id, () => {
      const {patch, state} = configs[id];
      expect(reduce(state, patch)).toMatchSnapshot();
    });
  });
}
