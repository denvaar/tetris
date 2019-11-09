import shiftRows from '../shiftRows';
import {makeColumns} from '../../utils/testHelpers';

describe('shiftRows', () => {
  test('single completed row', () => {
    // prettier-ignore
    const columns = makeColumns([
      [0, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 0, 1],
    ]);

    // prettier-ignore
    const expected = makeColumns([
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
    ]);

    expect(shiftRows(columns, [1])).toEqual(expected);
  });

  test('several completed row', () => {
    // prettier-ignore
    const columns = makeColumns([
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
    ]);

    // prettier-ignore
    const expected = makeColumns([
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(shiftRows(columns, [1, 2, 3])).toEqual(expected);
  });

  test('no completed row', () => {
    // prettier-ignore
    const columns = makeColumns([
      [0, 0, 1, 0],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
      [0, 1, 1, 0],
    ]);

    // prettier-ignore
    const expected = makeColumns([
      [0, 0, 1, 0],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
      [0, 1, 1, 0],
    ]);

    expect(shiftRows(columns, [])).toEqual(expected);
  });
});
