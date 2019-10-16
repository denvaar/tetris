import {offsetPieceLeft, offsetPieceBottom, offsetPieceRight} from '../offsets';

describe('offsetPieceLeft', () => {
  test('offset is 0 when the leftmost column contains a 1', () => {
    // prettier-ignore
    const block = [
      1, 1, 1,
      0, 1, 0,
      0, 0, 0
    ];
    expect(offsetPieceLeft(block)).toBe(0);
  });
  test('offset is 1 when the second column from the left contains a 1', () => {
    // prettier-ignore
    const block = [
      0, 1, 1,
      0, 1, 0,
      0, 1, 0
    ];
    expect(offsetPieceLeft(block)).toBe(1);
  });
  test('offset is 3 when the fourth column from the left contains a 1', () => {
    // prettier-ignore
    const block = [
      0, 0, 0, 1,
      0, 0, 0, 1,
      0, 0, 0, 1,
      0, 0, 0, 1
    ];
    expect(offsetPieceLeft(block)).toBe(3);
  });
});

describe('offsetPieceRight', () => {
  test('offset is 2 when the rightmost column contains a 1', () => {
    // prettier-ignore
    const block = [
      1, 1, 1,
      0, 1, 0,
      0, 0, 0
    ];
    expect(offsetPieceRight(block)).toBe(2);
  });
  test('offset is 1 when the second column from the right contains a 1', () => {
    // prettier-ignore
    const block = [
      1, 1, 0,
      0, 1, 0,
      0, 1, 0
    ];
    expect(offsetPieceRight(block)).toBe(1);
  });
  test('offset is 0 when the fourth column from the right contains a 1', () => {
    // prettier-ignore
    const block = [
      0, 0, 0, 0,
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ];
    expect(offsetPieceRight(block)).toBe(0);
  });
});

describe('offsetPieceBottom', () => {
  test('offset is 2 when the bottom row contains a 1', () => {
    // prettier-ignore
    const block = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 1
    ];
    expect(offsetPieceBottom(block)).toBe(2);
  });
  test('offset is 1 when the second row from bottom contains a 1', () => {
    // prettier-ignore
    const block = [
      1, 1, 0,
      0, 1, 0,
      0, 0, 0
    ];
    expect(offsetPieceBottom(block)).toBe(1);
  });
  test('offset is 0 when the fourth column from the bottom contains a 1', () => {
    // prettier-ignore
    const block = [
      1, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ];
    expect(offsetPieceBottom(block)).toBe(0);
  });
});
