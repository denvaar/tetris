const EMPTY_CELL = ' ';
const GUIDE_CELL = '░';
const FULL_CELL = '█';
const TOP_ROW = 2;
const WIDTH = 13;
const HEIGHT = 25;

const drawScreen = (state: GameState): void => {
  let screen = '';
  screen += drawBoard();

  const {activePiece, activePieceX, activePieceY} = state;
  screen += drawPiece(activePiece, activePieceX, activePieceY);

  writeScreen(screen);
};

const drawBoard = (): string => {
  let screen = moveCursorTo(TOP_ROW, TOP_ROW);
  for (let row = TOP_ROW; row <= HEIGHT; row++) {
    for (let col = TOP_ROW; col <= WIDTH; col++) {
      screen += moveCursorTo(row, col);
      if (col === WIDTH || col === TOP_ROW) {
        if (col === TOP_ROW && row === HEIGHT) {
          screen += '└';
        } else if (row === HEIGHT) {
          screen += '┘';
        } else {
          screen += '│';
        }
      } else if (row === HEIGHT) {
        screen += '─';
      } else {
        screen += EMPTY_CELL;
      }
    }
  }
  return screen;
};

const drawPiece = (piece: Tetrominoe, column: number, row: number): string => {
  let screen = '';
  let cursorRow = row;
  let cursorColumn = column;
  const size = Math.sqrt(piece.length);

  for (let i = 0; i < piece.length; i++) {
    if (i % size === 0) {
      cursorRow++;
      cursorColumn = column;
    }

    if (piece[i] === 1) {
      screen += moveCursorTo(cursorRow, cursorColumn);
      screen += FULL_CELL;
    } else {
      // TODO: remove after debugging
      screen += moveCursorTo(cursorRow, cursorColumn);
      screen += GUIDE_CELL;
    }
    cursorColumn++;
  }

  console.log(screen);
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
