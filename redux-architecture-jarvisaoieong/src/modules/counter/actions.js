export const INC = 'INC';
export const DEC = 'DEC';

export const inc = (value = 1) => ({
  type: INC,
  value,
});

export const dec = (value = 1) => ({
  type: DEC,
  value,
});
