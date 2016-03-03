export const MODIFY_FIRST = 'MODIFY_PAIR_FIRST_RANDOM_GIF';
export const MODIFY_SECOND = 'MODIFY_PAIR_SECOND_RANDOM_GIF';

export const modifyFirst = (action) => ({
  type: MODIFY_FIRST,
  action,
});

export const modifySecond = (action) => ({
  type: MODIFY_SECOND,
  action,
});
