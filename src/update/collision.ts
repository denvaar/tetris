import {iterateColumns} from '../utils';

const checkCollision = (
  blockColumn: number,
  blockRow: number,
  columns: FrozenTetrominoe[][],
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
    return (
      column >= columns.length ||
      column < 0 ||
      row > columns[0].length - 1 ||
      columns[column][row].value === 1
    );
  });
};

export const checkCollisionRight = (
  blockColumn: number,
  blockRow: number,
  columns: FrozenTetrominoe[][],
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
    const row = Number(r) < 0 ? 0 : Number(r);
    const column = maxPosition[r];
    return (
      column < 0 || column >= columns.length || columns[column][row].value === 1
    );
  });
};

export const checkCollisionLeft = (
  blockColumn: number,
  blockRow: number,
  columns: FrozenTetrominoe[][],
  block: Tetrominoe,
): boolean => {
  const size = Math.sqrt(block.layout.length);

  // TODO: get rid of `any` type
  const minPosition: any = {}; // {row: column}

  iterateColumns(size, (columnOffset, rowOffset) => {
    if (block.layout[size * rowOffset + columnOffset] === 1) {
      const adjustedColumn = blockColumn + columnOffset;
      const adjustedRow = blockRow + rowOffset;
      const lastMinColumn =
        Number(minPosition[adjustedRow]) === 0
          ? 0
          : Number(minPosition[adjustedRow]) || Infinity;
      minPosition[adjustedRow] = Math.min(lastMinColumn, adjustedColumn);
    }
  });

  return Object.keys(minPosition).some(r => {
    const row = Number(r) < 0 ? 0 : Number(r);
    const column = minPosition[r];
    return (
      column >= columns.length || column < 0 || columns[column][row].value === 1
    );
  });
};

export default checkCollision;
