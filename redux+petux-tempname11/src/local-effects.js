/* @flow */
import type { Emit } from 'petux';

type Computation<R> = () => R;

export default function<E, S, R>(
  localHandler: (E, S) => S
): {|
  emit: Emit<E>,
  withLocal: (S, Computation<R>) => [R, S],
|} {
  let local;

  function emit(effect) {
    local = localHandler(effect, local);
  }

  function withLocal(initial, computation) {
    local = initial;
    const result = computation();
    return [result, local];
  }

  return { emit, withLocal };
}
