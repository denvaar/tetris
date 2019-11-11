import freezeBlock from '../freezeBlock';

describe('freezeBlock', () => {
  it('freezes a block at the first available coordinates', () => {
    const color: Color = {
      normal: '',
      bright: '',
    };
    const block: Tetrominoe = {
      color,
      // prettier-ignore
      layout: [
        0, 0, 0,
        0, 1, 0,
        1, 1, 1
      ]
    };

    const blockColumn = 0;
    const blockRow = 21;
    const columns: FrozenTetrominoe[][] = Array.from({length: 10}, () =>
      Array.from({length: blockRow + Math.sqrt(block.layout.length)}, () => ({
        value: 0,
        color: null,
      })),
    );

    const result = freezeBlock(block, blockColumn, blockRow, columns);

    expect(result[0][result[0].length - 1]).toEqual({value: 1, color});
    expect(result[1][result[0].length - 1]).toEqual({value: 1, color});
    expect(result[1][result[0].length - 2]).toEqual({value: 1, color});
    expect(result[2][result[0].length - 1]).toEqual({value: 1, color});
  });
});
