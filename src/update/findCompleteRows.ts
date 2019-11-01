const findCompleteRows = (columns: FrozenTetrominoe[][]): number[] => {
  let completeRows: number[] = [];
  const columnLength = columns.length; // should be 10

  for (let rIndex = 0; rIndex < columns[0].length; rIndex++) {
    let rowValues = [];

    for (let cIndex = 0; cIndex < columnLength; cIndex++) {
      rowValues.push(columns[cIndex][rIndex].value);
    }

    if (rowValues.every(val => val === 1)) {
      completeRows.push(rIndex);
    } else if (completeRows.length > 0) {
      // no need to continue looping since complete rows will
      // always be consecutive
      return completeRows;
    }
  }

  return completeRows;
};

export default findCompleteRows;
