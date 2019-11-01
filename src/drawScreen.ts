import colors from './utils/colors';
import checkCollision from './update/collision';

const EMPTY_CELL = ' ';
const GUIDE_CELL = '░';
const FULL_CELL = '█';
const TOP_ROW = 2;
const WIDTH = 13;
const HEIGHT = 25;
const columnOffset = 3;
const rowOffset = 1;

const drawScreen = (state: GameState): void => {
  let screen = '';
  screen += drawBoard();

  const {block, columns} = state;
  const blockColumn = state.blockColumn + columnOffset;
  const blockRow = state.blockRow + rowOffset;

  // draw ghost piece
  let ghostPieceRow = blockRow;
  // TODO: not very efficient to loop like this
  while (!checkCollision(state.blockColumn, ghostPieceRow, columns, block)) {
    ghostPieceRow++;
  }
  screen += drawPiece(block, blockColumn, ghostPieceRow, colors.darkGray);

  screen += drawPiece(block, blockColumn, blockRow, block.color);
  screen += drawLandedPieces(columns);

  writeScreen(screen);
};

const drawLandedPieces = (pieces: FrozenTetrominoe[][]): string => {
  let screen = '';

  for (let row = 0; row < pieces[0].length; row++) {
    for (let col = 0; col < 10; col++) {
      const cellValue = pieces[col][row].value;
      const cellColor = pieces[col][row].color;

      if (cellValue === 1) {
        screen += moveCursorTo(row + 2, col + 3);
        screen += cellColor;
        screen += FULL_CELL;
      } else {
        screen += colors.reset;
      }
    }
  }

  return screen;
};

const drawBoard = (): string => {
  let screen = moveCursorTo(TOP_ROW, TOP_ROW);
  screen += colors.lightGray;
  for (let row = TOP_ROW; row <= HEIGHT; row++) {
    for (let col = TOP_ROW; col <= WIDTH; col++) {
      screen += moveCursorTo(row, col);
      if (col === WIDTH || col === TOP_ROW) {
        if (col === TOP_ROW && row === HEIGHT) {
          screen += FULL_CELL;
        } else if (row === HEIGHT) {
          screen += FULL_CELL;
        } else {
          screen += FULL_CELL;
        }
      } else if (row === HEIGHT) {
        screen += FULL_CELL;
      } else {
        screen += EMPTY_CELL;
      }
    }
  }
  screen += colors.reset;
  return screen;
};

const drawPiece = (
  piece: Tetrominoe,
  column: number,
  row: number,
  color: string,
): string => {
  let screen = '';
  let cursorRow = row;
  let cursorColumn = column;
  const size = Math.sqrt(piece.layout.length);

  screen += color;

  for (let i = 0; i < piece.layout.length; i++) {
    if (i % size === 0) {
      cursorRow++;
      cursorColumn = column;
    }

    if (piece.layout[i] === 1) {
      screen += moveCursorTo(cursorRow, cursorColumn);
      screen += FULL_CELL;
    }
    cursorColumn++;
  }

  screen += colors.reset;

  return screen;
};

const moveCursorTo = (
  column: number | string,
  row: number | string,
): string => {
  return `\x1b[${column};${row}H`;
};

const saveCursorPosition = (): string => {
  return `\x1b[s`;
};

const restoreCursorPosition = (): string => {
  return `\x1b[u`;
};

// const clearScreen = () => {
//   process.stdout.write('\x1b[2J');
// };

const writeScreen = (data: string): void => {
  process.stdout.write(data);
};

export default drawScreen;
