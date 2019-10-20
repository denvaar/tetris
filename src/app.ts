import drawScreen from './drawScreen';
import rotate from './rotation';
import tetrominoes from './tetrominoes';
import update from './update';

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true);
}

const tetris = (): void => {
  // save cursor
  process.stdout.write('\x1b[s');

  let lastPressed = '';
  const columns: Array<Array<number>> = new Array(10)
    .fill(undefined)
    .map(() => new Array(24).fill(0));

  const initialState: GameState = {
    prevScreenData: null,
    block: tetrominoes[2],
    blockColumn: 0,
    blockRow: 0,
    columns,
  };

  const gameLoop = (state: GameState): void => {
    setTimeout(() => {
      let nextState = {...state};
      // draw game state
      drawScreen(nextState);
      // update game state
      nextState = update(nextState, lastPressed, () => {
        lastPressed = '';
      });
      gameLoop(nextState);
    }, 30);
  };

  process.stdin.on('keypress', (str, {ctrl, name}) => {
    if (ctrl && name === 'c') process.exit();

    const acceptableKeys = ['r', 'l', 'h', 'j'];
    if (acceptableKeys.includes(name)) {
      lastPressed = name;
    }
  });

  process.on('exit', () => {
    process.stdout.write('\x1b[2J');
    process.stdout.write('\x1b[?25h');
    // restore cursor
    process.stdout.write('\x1b[u');
  });

  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[?25l');

  gameLoop(initialState);
};

tetris();
