import shiftRows from './shiftRows';
import tetrominoes from '../tetrominoes';
import {getRandomInt} from '../utils';
import fillBag from '../utils/fillBag';

const getNextBlock = (state: GameState): GameState => {
  const nextBlockIndex = state.nextBlocks.shift();
  const queuedBlockIndex = state.blockBag.shift();
  state.nextBlocks.push(queuedBlockIndex as number);

  if (state.blockBag.length === 0) {
    state.blockBag = fillBag();
  }

  state.block = tetrominoes[nextBlockIndex as number];
  state.columns = shiftRows(state.columns);
  state.blockRow = 0;
  state.blockColumn = 0;
  state.pendingFreeze = false;
  state.pendingFreezeTTL = 0;
  state.preventSaveBlock = false;

  return state;
};

export default getNextBlock;
