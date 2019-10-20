import {iterateColumns} from '../utils';

const checkCollision = (state: GameState): boolean => {
  const {blockColumn, blockRow, columns, block} = state;
  const size = Math.sqrt(block.layout.length);

  // TODO: get rid of `any` type
  const maxPosition: any = {}; // {column: row}

  iterateColumns(size, (columnOffset, rowOffset) => {
    if (block.layout[size * rowOffset + columnOffset] === 1) {
      const adjustedColumn = blockColumn + columnOffset;
      const adjustedRow = blockRow + rowOffset;
      const lastMaxRow = Number(maxPosition[adjustedColumn]) || 0;
      maxPosition[adjustedColumn] = Math.max(lastMaxRow, adjustedRow);
    }
  });

  return Object.keys(maxPosition).some(c => {
    const column = Number(c);
    const row = maxPosition[c];
    return columns[column][row + 1] === 1 || row + 1 === columns[0].length - 1;
  });
};

export default checkCollision;
