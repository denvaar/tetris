import checkCollision from './collision';
import rotate from '../rotation';
import tetrominoes from '../tetrominoes';
import {getRandomInt, iterateColumns} from '../utils';
import {offsetPieceBottom, offsetPieceLeft, offsetPieceRight} from './offsets';

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

const update = (
  state: GameState,
  lastPressed: string,
  clearLastPressed: () => void,
): GameState => {
  const minColumn = 0;
  const maxColumn = 9;
  const maxRow = 22;
  const {blockColumn, blockRow} = state;

  if (lastPressed === 'r') {
    state.block = {...state.block, layout: rotate(state.block.layout)};
  }
  if (lastPressed === 'l') {
    const xOffset = offsetPieceRight(state.block.layout);
    if (blockColumn < maxColumn - xOffset) {
      state.blockColumn += 1;
    }
  }
  if (lastPressed === 'h') {
    const xOffset = offsetPieceLeft(state.block.layout);
    if (blockColumn > minColumn - xOffset) {
      state.blockColumn -= 1;
    }
  }
  if (lastPressed === 'j') {
    const yOffset = offsetPieceBottom(state.block.layout);
    if (blockRow + yOffset < maxRow) {
      state.blockRow += 1;
    }
  }

  if (checkCollision(state)) {
    state.columns = freezeBlock(
      state.block,
      state.blockColumn,
      state.blockRow,
      state.columns,
    );
    state.block = tetrominoes[getRandomInt(0, 6)];
    state.blockRow = 0;
    state.blockColumn = 0;
  }

  clearLastPressed();

  return state;
};

export default update;
