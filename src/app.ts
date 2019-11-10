import render from './rendering';
import rotate from './rotation';
import tetrominoes from './tetrominoes';
import update from './update';
import fillBag from './utils/fillBag';
import checkCollision from './update/collision';

import SoundService from './utils/sounds';
import {ChildProcess} from 'child_process';

const os = require('os');
const fs = require('fs');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true);
}

const tetris = (config: GameConfig): void => {
  // save cursor
  process.stdout.write('\x1b[s');

  let music: null | ChildProcess;
  if (config.musicEnabled === true) {
    music = SoundService.getInstance().playBackgroundMusic();
  }

  let lastPressed = '';
  const columns: FrozenTetrominoe[][] = Array.from({length: 10}, () =>
    Array.from({length: 24}, () => ({value: 0, color: null})),
  );
  const bag = fillBag();
  const firstBlockIndex = bag.shift();
  const nextBlocks = bag.splice(0, 3);

  const initialState: GameState = (() => {
    const defaultState: GameState = {
      gameOver: false,
      rowClearCount: 0,
      score: 0,
      preventSaveBlock: false,
      savedBlock: null,
      nextBlocks,
      blockBag: bag,
      block: tetrominoes[firstBlockIndex as number],
      blockColumn: 3,
      blockRow: -1,
      columns,
      downPressCount: 0,
      level: 1,
      pendingFreeze: false,
      pendingFreezeTTL: 0,
      prevScreen: null,
    };

    try {
      const pausedData = fs.readFileSync(config.pauseDataFile);
      fs.writeFileSync(config.pauseDataFile, '');

      if (pausedData === '') {
        return defaultState;
      }

      return JSON.parse(pausedData);
    } catch (err) {
      return defaultState;
    }
  })();

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
    if (config.musicEnabled === true) {
      if ((music as any).exitCode === 0) {
        music = SoundService.getInstance().playBackgroundMusic();
      }
    }
    let nextState = {...state};
    setTimeout(() => {
      nextState = render(nextState);
      gameLoop(nextState);
    }, tickLengthMs);

    const now = hrtimeMs();
    const delta = (now - previous) / 1000;

    if (timeElapsed >= 1 - state.level * 0.15) {
      timeElapsed = 0;

      if (!nextState.pendingFreeze) {
        if (
          !checkCollision(
            state.blockColumn,
            state.blockRow + 1,
            state.columns,
            state.block,
          )
        ) {
          nextState.blockRow++;
        }
      }

      if (nextState.pendingFreeze && nextState.pendingFreezeTTL > 0) {
        nextState.pendingFreezeTTL--;
      }
    }
    timeElapsed += delta;
    nextState = render(nextState);
    // update game state
    nextState = update(nextState, config, lastPressed, () => {
      lastPressed = '';
    });
    previous = now;
    tick++;
  };

  process.stdin.on('keypress', (str, {ctrl, name}) => {
    if (ctrl && name === 'c') process.exit();

    const acceptableKeys = ['p', ...Object.values(config.controls)]; //, 'r', 'l', 'h', 'j', 'space', 's'];
    if (acceptableKeys.includes(name)) {
      lastPressed = name;
    }
  });

  process.on('exit', iKnowYourNotSupposedToUseThisLikeThis => {
    // process.stdout.write('\x1b[2J');
    process.stdout.write('\x1b[?25h');
    // restore cursor
    process.stdout.write('\x1b[u');
    if (music && config.musicEnabled === true) {
      music.kill();
    }
    if (typeof iKnowYourNotSupposedToUseThisLikeThis === 'string') {
      console.log(iKnowYourNotSupposedToUseThisLikeThis);
    }
  });

  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[?25l');

  gameLoop(initialState);
};

const defaultConfig = {
  controls: {
    left: 'h',
    right: 'l',
    down: 'j',
    hardDrop: 'space',
    rotate: 'r',
    saveBlock: 's',
  },
  musicEnabled: false,
  soundEffectsEnabled: true,
  pauseDataFile: '/tmp/tetris',
};

const config: GameConfig = (() => {
  try {
    return {
      ...defaultConfig,
      ...JSON.parse(fs.readFileSync(`${os.homedir()}/.tetris.json`)),
    };
  } catch (err) {
    return defaultConfig;
  }
})();

tetris(config);
