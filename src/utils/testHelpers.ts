export const makeColumns = (columns: number[][]): FrozenTetrominoe[][] => {
  return columns.map(c => {
    return c.map(cc => ({value: cc, color: null}));
  });
};
