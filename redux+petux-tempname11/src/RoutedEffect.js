/* @flow */
import type { Emit } from 'petux';

export default class RoutedEffect<E, A, B> {
  base: E
  route: A => B
  constructor(base: E, route: A => B) {
    this.base = base;
    this.route = route;
  }
  static create<E1, A1>(base: E1): RoutedEffect<E1, A1, A1> {
    return new RoutedEffect(base, x => x);
  }
  map<C>(f: B => C): RoutedEffect<E, A, C> {
    const { base, route } = this;
    return new RoutedEffect(base, a => f(route(a)));
  }
}

export function emap<E, A, B, C>(f: C => B):
  Emit<RoutedEffect<E, A, B>> => Emit<RoutedEffect<E, A, C>>
{
  return emit => e => emit(e.map(f));
}
