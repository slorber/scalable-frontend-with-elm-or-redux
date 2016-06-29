import { EVENTS as ENGINE_EVENTS } from 'engine';
import { toTransformer } from 'engine/utils';
import Msg from './messages';

export default [
  [
    ENGINE_EVENTS.INIT,
    Msg.GIF_REQUESTED,
  ],
]::toTransformer();
