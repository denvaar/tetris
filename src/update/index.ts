import checkCollision, {
  checkCollisionRight,
  checkCollisionLeft,
} from './collision';
import rotate from '../rotation';
import shiftRows from './shiftRows';
import tetrominoes from '../tetrominoes';
import {getRandomInt, iterateColumns} from '../utils';
import wallKick from './wallKick';

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

const minColumn = 0;
const maxColumn = 9;
const maxRow = 22;

const update = (
  state: GameState,
  lastPressed: string,
  clearLastPressed: () => void,
): GameState => {
  const {blockColumn, blockRow} = state;

  /* fast drop */
  if (lastPressed === 'space') {
    let row = blockRow;
    while (!checkCollision(blockColumn, row + 1, state.columns, state.block)) {
      row++;
    }
    state.blockRow = row;
  }

  /* rotate */
  if (lastPressed === 'r') {
    const rotatedBlock = {
      ...state.block,
      layout: rotate([...state.block.layout]),
    };
    if (
      !checkCollision(blockColumn, blockRow, state.columns, rotatedBlock) &&
      !checkCollisionRight(
        blockColumn,
        blockRow,
        state.columns,
        rotatedBlock,
      ) &&
      !checkCollisionLeft(blockColumn, blockRow, state.columns, rotatedBlock)
    ) {
      state.block = rotatedBlock;
    } else {
      const [wallKickColumn, wallKickRow] = wallKick(
        blockColumn,
        blockRow,
        state.columns,
        rotatedBlock,
        maxColumn,
      );

      if (wallKickColumn !== 0) {
        state.block = rotatedBlock;
        state.blockColumn = state.blockColumn + wallKickColumn;
        state.blockRow = state.blockRow - wallKickRow;
      }

      clearLastPressed();
      return state;
    }
  }

  /* move right */
  if (lastPressed === 'l') {
    if (
      !checkCollisionRight(
        blockColumn + 1,
        blockRow,
        state.columns,
        state.block,
      )
    ) {
      state.blockColumn += 1;
    }
  }

  /* move left */
  if (lastPressed === 'h') {
    if (
      !checkCollisionLeft(blockColumn - 1, blockRow, state.columns, state.block)
    ) {
      state.blockColumn -= 1;
    }
  }

  /* move down */
  if (lastPressed === 'j') {
    if (
      !checkCollision(blockColumn, blockRow + 1, state.columns, state.block)
    ) {
      state.blockRow += 1;
    }
  }

  if (
    checkCollision(
      state.blockColumn,
      state.blockRow + 1,
      state.columns,
      state.block,
    )
  ) {
    state.columns = freezeBlock(
      state.block,
      state.blockColumn,
      state.blockRow,
      state.columns,
    );

    state.columns = shiftRows(state.columns);
    state.block = tetrominoes[getRandomInt(0, 6)];
    state.blockRow = 0;
    state.blockColumn = 0;
  }

  clearLastPressed();

  return state;
};

export default update;
