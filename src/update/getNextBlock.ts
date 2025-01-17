import AudioService from '../utils/sounds';
import ConfigService from '../utils/config';
import calculatePoints from './calculatePoints';
import fillBag from '../utils/fillBag';
import findCompleteRows from './findCompleteRows';
import shiftRows from './shiftRows';
import tetrominoes from '../tetrominoes';
import {getRandomInt} from '../utils';

const getNextBlock = (state: GameState, config: GameConfig): GameState => {
  const nextBlockIndex = state.nextBlocks.shift();
  const queuedBlockIndex = state.blockBag.shift();
  state.nextBlocks.push(queuedBlockIndex as number);

  if (state.blockBag.length === 0) {
    state.blockBag = fillBag();
  }

  const completeRows = findCompleteRows(state.columns);

  if (config.soundEffectsEnabled === true && completeRows.length > 0) {
    if (completeRows.length >= 4) {
      AudioService.getInstance().playTetrisSound();
    } else {
      AudioService.getInstance().playRowClearSound();
    }
  }

  if (state.rowClearCount + completeRows.length >= 10) {
    state.rowClearCount = state.rowClearCount + completeRows.length - 10;
    state.level++;
  } else {
    state.rowClearCount += completeRows.length;
  }

  state.score += calculatePoints(completeRows.length, state.level);
  state.block = tetrominoes[nextBlockIndex as number];
  state.columns = shiftRows(state.columns, completeRows);
  state.blockRow = -1;
  state.blockColumn = 3;
  state.pendingFreeze = false;
  state.pendingFreezeTTL = 0;
  state.preventSaveBlock = false;

  if (state.columns.some(col => col[0].value === 1)) {
    state.gameOver = true;

    const config = ConfigService.getInstance().getConfig();

    let gameOverMessage = `Game Over\nScore: ${state.score}\n`;

    if (state.score > config.highScore) {
      ConfigService.getInstance().updateHighScore(state.score);
      gameOverMessage += 'New high score!\n';
    }

    process.exit(gameOverMessage as any);
  }

  return state;
};

export default getNextBlock;
