import * as findCompleteRows from '../findCompleteRows';
import shiftRows from '../shiftRows';
import {makeColumns} from '../../utils/testHelpers';

const findCompleteRowsSpy = jest.spyOn(findCompleteRows, 'default');

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

    findCompleteRowsSpy.mockImplementation(() => [1]);

    expect(shiftRows(columns)).toEqual(expected);
    expect(findCompleteRowsSpy).toHaveBeenCalledWith(columns);
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

    findCompleteRowsSpy.mockImplementation(() => [1, 2, 3]);

    expect(shiftRows(columns)).toEqual(expected);
    expect(findCompleteRowsSpy).toHaveBeenCalledWith(columns);
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

    findCompleteRowsSpy.mockImplementation(() => []);

    expect(shiftRows(columns)).toEqual(expected);
    expect(findCompleteRowsSpy).toHaveBeenCalledWith(columns);
  });
});
