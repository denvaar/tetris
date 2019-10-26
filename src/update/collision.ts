import {iterateColumns} from '../utils';

const checkCollision = (
  blockColumn: number,
  blockRow: number,
  columns: number[][],
  block: Tetrominoe,
): boolean => {
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

export const checkCollisionRight = (
  blockColumn: number,
  blockRow: number,
  columns: number[][],
  block: Tetrominoe,
): boolean => {
  const size = Math.sqrt(block.layout.length);

  // TODO: get rid of `any` type
  const maxPosition: any = {}; // {row: column}

  iterateColumns(size, (columnOffset, rowOffset) => {
    if (block.layout[size * rowOffset + columnOffset] === 1) {
      const adjustedColumn = blockColumn + columnOffset;
      const adjustedRow = blockRow + rowOffset;
      const lastMaxColumn = Number(maxPosition[adjustedRow]) || 0;
      maxPosition[adjustedRow] = Math.max(lastMaxColumn, adjustedColumn);
    }
  });

  return Object.keys(maxPosition).some(r => {
    const row = Number(r);
    const column = maxPosition[r];
    return columns[column + 1][row] === 1 || column === columns.length - 1;
  });
};

export const checkCollisionLeft = (
  blockColumn: number,
  blockRow: number,
  columns: number[][],
  block: Tetrominoe,
): boolean => {
  const size = Math.sqrt(block.layout.length);

  // TODO: get rid of `any` type
  const minPosition: any = {}; // {row: column}

  iterateColumns(size, (columnOffset, rowOffset) => {
    if (block.layout[size * rowOffset + columnOffset] === 1) {
      const adjustedColumn = blockColumn + columnOffset;
      const adjustedRow = blockRow + rowOffset;
      const lastMinColumn = Number(minPosition[adjustedRow]) || Infinity;
      minPosition[adjustedRow] = Math.min(lastMinColumn, adjustedColumn);
    }
  });

  return Object.keys(minPosition).some(r => {
    const row = Number(r);
    const column = minPosition[r];
    return column === 0 || columns[column - 1][row] === 1;
  });
};

export default checkCollision;
