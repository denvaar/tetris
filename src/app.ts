import drawScreen from './drawScreen';
import rotate from './rotation';
import tetrominoes from './tetrominoes';
import update from './update';
import logger from './utils/logger';

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
    level: 1,
    columns,
  };

  const hrtimeMs = function() {
    let time = process.hrtime();
    return time[0] * 1000 + time[1] / 1000000;
  };

  const TICK_RATE = 30;
  let tick = 0;
  let previous = hrtimeMs();
  let tickLengthMs = 1000 / TICK_RATE;

  let timeElapsed = 0;

  const gameLoop = (state: GameState): void => {
    let nextState = {...state};
    setTimeout(() => {
      // draw game state
      drawScreen(nextState);
      gameLoop(nextState);
    }, tickLengthMs);

    const now = hrtimeMs();
    const delta = (now - previous) / 1000;

    if (timeElapsed >= 1 - state.level * 0.1) {
      timeElapsed = 0;
      nextState.blockRow++;
    }
    timeElapsed += delta;
    // update game state
    nextState = update(nextState, lastPressed, () => {
      lastPressed = '';
    });
    previous = now;
    tick++;
  };

  process.stdin.on('keypress', (str, {ctrl, name}) => {
    if (ctrl && name === 'c') process.exit();

    const acceptableKeys = ['r', 'l', 'h', 'j', 'space'];
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
