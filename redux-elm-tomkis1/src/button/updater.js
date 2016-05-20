import { Updater } from 'redux-elm';

export const isActive = model => model;

export const initialModel = false;

export default new Updater(initialModel)
  .case('Toggle', model => !model)
  .toReducer();
