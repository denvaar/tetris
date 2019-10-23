import findCompleteRows from '../findCompleteRows';

describe('findCompleteRows', () => {
  test('Index of single row with 1 in every column is returned', () => {
    // prettier-ignore
    const columns = [
      [0, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
    ];

    const indices = findCompleteRows(columns);

    expect(indices).toEqual([1]);
  });

  test('Indices of multiple rows with 1 in every column are returned', () => {
    // prettier-ignore
    const columns = [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
    ];

    const indices = findCompleteRows(columns);

    expect(indices).toEqual([1, 2, 3]);
  });

  test('No indices are returned if there are no rows with 1 in every column', () => {
    // prettier-ignore
    const columns = [
      [0, 0, 1, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
    ];

    const indices = findCompleteRows(columns);

    expect(indices).toEqual([]);
  });
});
