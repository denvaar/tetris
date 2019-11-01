import {iterateColumns} from '../utils';

const freezeBlock = (
  block: Tetrominoe,
  blockColumn: number,
  blockRow: number,
  columns: FrozenTetrominoe[][],
): FrozenTetrominoe[][] => {
  const size = Math.sqrt(block.layout.length);

  iterateColumns(size, (columnOffset, rowOffset) => {
    if (block.layout[size * rowOffset + columnOffset] === 1) {
      const adjustedColumn = blockColumn + columnOffset;
      const adjustedRow = blockRow + rowOffset;

      columns[adjustedColumn][adjustedRow] = {value: 1, color: block.color};
    }
  });

  return columns;
};

export default freezeBlock;
