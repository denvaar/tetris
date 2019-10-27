import {iterateColumns} from '../utils';

const checkCollision = (
  blockColumn: number,
  blockRow: number,
  columns: number[][],
  block: Tetrominoe,
  thing = 1,
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
    if (column < 0) return true;
    return (
      columns[column][row + thing] === 1 ||
      row + thing === columns[0].length - 1
    );
  });
};

export const checkCollisionRight = (
  blockColumn: number,
  blockRow: number,
  columns: number[][],
  block: Tetrominoe,
  thing = 1,
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
    return (
      columns[column + thing][row] === 1 || column === columns.length - thing
    );
  });
};

export const checkCollisionLeft = (
  blockColumn: number,
  blockRow: number,
  columns: number[][],
  block: Tetrominoe,
  thing = 1,
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
    return column - thing < 0 || columns[column - thing][row] === 1;
  });
};

export default checkCollision;
