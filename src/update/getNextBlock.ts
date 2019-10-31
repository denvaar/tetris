import shiftRows from './shiftRows';
import tetrominoes from '../tetrominoes';
import {getRandomInt} from '../utils';

const getNextBlock = (state: GameState): GameState => {
  state.columns = shiftRows(state.columns);
  state.block = tetrominoes[getRandomInt(0, 6)];
  state.blockRow = 0;
  state.blockColumn = 0;
  state.pendingFreeze = false;
  state.pendingFreezeTTL = 0;

  return state;
};

export default getNextBlock;
