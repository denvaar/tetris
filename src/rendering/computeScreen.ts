import colors from '../utils/colors';
import checkCollision from '../update/collision';
import tetrominoes from '../tetrominoes';
import {iterateColumns} from '../utils';
import computeNextBlockUI from './computeNextBlockUI';

const FULL_CELL = '█';
const EMPTY_CELL = ' ';

const computeScreen = (
  boardColumnSize: number,
  boardOffsetColumns: number,
  boardRowSize: number,
  boardOffsetRows: number,
  block: Tetrominoe,
  blockColumn: number,
  blockRow: number,
  frozenBlocks: FrozenTetrominoe[][],
  nextBlocks: number[],
): ScreenInfo => {
  const screen = computeNextBlockUI(
    boardColumnSize + boardOffsetColumns,
    nextBlocks,
    {},
  );

  const blockSize = Math.sqrt(block.layout.length);

  for (let j = 0; j < boardRowSize; j++) {
    for (let i = 0; i < boardColumnSize; i++) {
      const column = i + boardOffsetColumns + 1;
      const row = j + boardOffsetRows + 1;

      /* walls & floor */
      if (i === 0 || i === boardColumnSize - 1 || j === boardRowSize - 1) {
        screen[String([column, row])] = {
          color: colors.lightGray,
          value: FULL_CELL,
        };
      } else {
        screen[String([column, row])] = {
          color: null,
          value: EMPTY_CELL,
        };
      }
    }
  }

  let ghostBlockRow = blockRow;
  // TODO: not very efficient to loop like this
  while (!checkCollision(blockColumn, ghostBlockRow, frozenBlocks, block)) {
    ghostBlockRow++;
  }

  ghostBlockRow -= 1;

  // TODO: try not to have to repeat the same loop.
  for (let j = 0; j < boardRowSize; j++) {
    for (let i = 0; i < boardColumnSize; i++) {
      const column = i + boardOffsetColumns + 1;
      const row = j + boardOffsetRows + 1;

      /* ghost block */
      if (
        i >= blockColumn &&
        i < blockColumn + blockSize &&
        j >= ghostBlockRow &&
        j < ghostBlockRow + blockSize
      ) {
        const blockOffsetColumn = i - blockColumn;
        const blockOffsetRow = j - ghostBlockRow;
        const layoutIndex = blockOffsetRow * blockSize + blockOffsetColumn;

        if (block.layout[layoutIndex] === 1) {
          screen[String([column + 1, row])] = {
            color: colors.lightGray,
            value: FULL_CELL,
          };
        }
      }

      /* active block */
      if (
        i >= blockColumn &&
        i < blockColumn + blockSize &&
        j >= blockRow &&
        j < blockRow + blockSize
      ) {
        const blockOffsetColumn = i - blockColumn;
        const blockOffsetRow = j - blockRow;
        const layoutIndex = blockOffsetRow * blockSize + blockOffsetColumn;

        if (block.layout[layoutIndex] === 1) {
          screen[String([column + 1, row])] = {
            color: block.color,
            value: FULL_CELL,
          };
        }
      }

      /* frozen blocks */
      if (
        frozenBlocks[i] &&
        frozenBlocks[i][j] &&
        frozenBlocks[i][j].value === 1
      ) {
        screen[String([column + 1, row])] = {
          color: frozenBlocks[i][j].color,
          value: FULL_CELL,
        };
      }
    }
  }

  return screen;
};

export default computeScreen;
