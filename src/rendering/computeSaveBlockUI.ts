import colors from '../utils/colors';
import tetrominoes from '../tetrominoes';
import {iterateColumns} from '../utils';

const FULL_CELL = '█';
const EMPTY_CELL = ' ';

const drawSaveBlock = (
  screen: ScreenInfo,
  block: Tetrominoe,
  col: number,
  row: number,
): ScreenInfo => {
  const blockSize = Math.sqrt(block.layout.length);

  for (let ii = 0; ii < 4; ii++) {
    for (let jj = 0; jj < 4; jj++) {
      screen[String([col + ii, row + jj])] = {
        color: null,
        value: EMPTY_CELL,
      };
    }
  }
  iterateColumns(blockSize, (colOffset, rowOffset) => {
    const layoutIndex = rowOffset * blockSize + colOffset;
    if (block.layout[layoutIndex] === 1) {
      screen[String([col + colOffset, row + rowOffset])] = {
        color: block.color,
        value: FULL_CELL,
      };
    }
  });

  return screen;
};

const computeSaveBlockUI = (
  columnStart: number,
  savedBlock: Tetrominoe | null,
  screen: ScreenInfo,
): ScreenInfo => {
  const columnSize = 6;
  const rowSize = 5;

  for (let j = 0; j < rowSize; j++) {
    for (let i = 0; i < columnSize; i++) {
      const col = columnStart + 2 + i;
      const row = j + 3;

      if (i === 1 && j === 1 && savedBlock !== null) {
        screen = drawSaveBlock(screen, savedBlock, col, row);
      }

      if (i === 0 && j === 0) {
        screen[`${col},${row}`] = {
          color: colors.lightGray,
          value: '╔',
        };
        continue;
      }

      if (i === 0 && j === rowSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.lightGray,
          value: '╚',
        };
        continue;
      }

      if (i === columnSize - 1 && j === rowSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.lightGray,
          value: '╝',
        };
        continue;
      }

      if (i === columnSize - 1 && j === 0) {
        screen[`${col},${row}`] = {
          color: colors.lightGray,
          value: '╗',
        };
        continue;
      }

      if (i === 0 || i === columnSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.lightGray,
          value: '║',
        };
        continue;
      }

      if (j === 0 || j === rowSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.lightGray,
          value: '═',
        };
        continue;
      }
    }
  }
  return screen;
};

export default computeSaveBlockUI;
