import checkCollision, {
  checkCollisionRight,
  checkCollisionLeft,
} from './collision';
import rotate from '../rotation';
import shiftRows from './shiftRows';
import tetrominoes from '../tetrominoes';
import {getRandomInt, iterateColumns} from '../utils';
import {offsetPieceBottom, offsetPieceLeft, offsetPieceRight} from './offsets';

import logger from '../utils/logger';

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

  /* rotate */
  if (lastPressed === 'r') {
    const rotatedBlock = {
      ...state.block,
      layout: rotate([...state.block.layout]),
    };
    const xOffset = offsetPieceRight(rotatedBlock.layout);
    if (
      blockColumn + xOffset <= maxColumn &&
      !checkCollisionRight(
        blockColumn,
        blockRow,
        state.columns,
        rotatedBlock,
        0,
      ) &&
      !checkCollision(blockColumn, blockRow, state.columns, rotatedBlock, 0) &&
      !checkCollisionLeft(blockColumn, blockRow, state.columns, rotatedBlock, 0)
    ) {
      state.block = rotatedBlock;
    } else {
      clearLastPressed();
      return state;
    }
  }

  /* move right */
  if (lastPressed === 'l') {
    const xOffset = offsetPieceRight(state.block.layout);
    if (
      blockColumn < maxColumn - xOffset &&
      !checkCollisionRight(blockColumn, blockRow, state.columns, state.block)
    ) {
      state.blockColumn += 1;
    }
  }

  /* move left */
  if (lastPressed === 'h') {
    const xOffset = offsetPieceLeft(state.block.layout);
    if (
      blockColumn > minColumn - xOffset &&
      !checkCollisionLeft(blockColumn, blockRow, state.columns, state.block)
    ) {
      state.blockColumn -= 1;
    }
  }

  /* move down */
  if (lastPressed === 'j') {
    const yOffset = offsetPieceBottom(state.block.layout);
    if (blockRow + yOffset < maxRow) {
      state.blockRow += 1;
    }
  }

  if (
    checkCollision(
      state.blockColumn,
      state.blockRow,
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
