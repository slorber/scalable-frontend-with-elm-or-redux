import {loop, Effects} from '@jarvisaoieong/redux-loop';
import _ from 'lodash';
import {NEW_GIF} from 'modules/randomGif';
import {newGifCount} from './actions';

export default (path, reducer) => (state, action) => {
  const {model, effect} = reducer(state, action);

  if (state !== model || !_.isEqual(effect, Effects.none())) {
    if (_.get(action, path) === NEW_GIF) {
      return loop(
        model
      ,
        Effects.batch([
          effect,
          Effects.constant(newGifCount()),
        ])
      );
    }
  }

  return loop(model, effect);
}
