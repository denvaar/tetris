import {iterateColumns} from '../utils';

const freezeBlock = (
  block: Tetrominoe,
  blockColumn: number,
  blockRow: number,
  columns: number[][],
): number[][] => {
  const size = Math.sqrt(block.layout.length);

  iterateColumns(size, (columnOffset, rowOffset) => {
    if (block.layout[size * rowOffset + columnOffset] === 1) {
      const adjustedColumn = blockColumn + columnOffset;
      const adjustedRow = blockRow + rowOffset;

      columns[adjustedColumn][adjustedRow] = 1;
    }
  });

  return columns;
};

export default freezeBlock;
