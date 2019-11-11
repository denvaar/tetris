import colors from '../utils/colors';
import tetrominoes from '../tetrominoes';
import {iterateColumns} from '../utils';

const FULL_CELL = '█';
const EMPTY_CELL = ' ';

const drawNextNBlock = (
  screen: ScreenInfo,
  nextBlockIndex: number,
  col: number,
  row: number,
): ScreenInfo => {
  const nextBlock = tetrominoes[nextBlockIndex];
  const blockSize = Math.sqrt(nextBlock.layout.length);

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
    if (nextBlock.layout[layoutIndex] === 1) {
      screen[String([col + colOffset, row + rowOffset])] = {
        color: nextBlock.color.normal,
        value: FULL_CELL,
      };
    }
  });

  return screen;
};

const computeNextBlockUI = (
  columnStart: number,
  nextBlocks: number[],
  screen: ScreenInfo,
): ScreenInfo => {
  const columnSize = 6;
  const rowSize = 16;

  for (let j = 0; j < rowSize; j++) {
    for (let i = 0; i < columnSize; i++) {
      const col = columnStart + 1 + i;
      const row = j + 3;

      if (i === 1 && j === 1) {
        screen = drawNextNBlock(screen, nextBlocks[0], col, row);
      }
      if (i === 1 && j === 6) {
        screen = drawNextNBlock(screen, nextBlocks[1], col, row);
      }
      if (i === 1 && j === 11) {
        screen = drawNextNBlock(screen, nextBlocks[2], col, row);
      }

      if (i === 0 && j === 0) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '╔',
        };
        continue;
      }

      if (i === 0 && j === rowSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '╚',
        };
        continue;
      }

      if (i === columnSize - 1 && j === rowSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '╝',
        };
        continue;
      }

      if (i === columnSize - 1 && j === 0) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '╗',
        };
        continue;
      }

      if (j % 5 === 0 && i === 0) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '╠',
        };
        continue;
      }

      if (j % 5 === 0 && i === columnSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '╣',
        };
        continue;
      }

      if (i === 0 || i === columnSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '║',
        };
        continue;
      }

      if (j % 5 === 0 || j === 0 || j === rowSize - 1) {
        screen[`${col},${row}`] = {
          color: colors.gray.bright,
          value: '═',
        };
        continue;
      }
    }
  }

  return screen;
};

export default computeNextBlockUI;
