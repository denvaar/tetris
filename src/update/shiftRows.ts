import findCompleteRows from './findCompleteRows';

const shiftRows = (columns: FrozenTetrominoe[][]): FrozenTetrominoe[][] => {
  const completeRows = findCompleteRows(columns);

  if (completeRows.length > 0) {
    const diff =
      Math.abs(completeRows[0] - completeRows[completeRows.length - 1]) + 1;
    return columns.map(column => {
      const newColumn = [
        ...[...Array(diff)].map(i => ({value: 0, color: null})),
        ...column.slice(0, completeRows[0]),
        ...column.slice(
          completeRows[completeRows.length - 1] + 1,
          column.length,
        ),
      ];
      return newColumn;
    });
  }

  return columns;
};

export default shiftRows;
