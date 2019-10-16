const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true);
}

import tetrominoes from './tetrominoes';
import drawScreen from './drawScreen';
import rotate from './rotation';
import update from './update';

const tetris = (): void => {
  // save cursor
  process.stdout.write('\x1b[s');

  let lastPressed = '';
  const initialState: GameState = {
    prevScreenData: null,
    activePiece: tetrominoes[3],
    activePieceX: 3,
    activePieceY: 3,
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
