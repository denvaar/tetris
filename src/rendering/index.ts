import computeScreen from './computeScreen';
import compareScreen from './compareScreen';
import writeScreen from './writeScreen';

const render = (state: GameState): GameState => {
  const boardColumnSize = 12;
  const boardOffsetColumns = 7;
  const boardRowSize = 25;
  const boardOffsetRows = 2;

  const screen = computeScreen(
    boardColumnSize,
    boardOffsetColumns,
    boardRowSize,
    boardOffsetRows,
    state.block,
    state.blockColumn,
    state.blockRow,
    state.columns,
    state.nextBlocks,
    state.savedBlock,
    state.score,
    state.level,
  );

  const diff = compareScreen(state.prevScreen, screen);

  writeScreen(diff);

  state.prevScreen = screen;

  return state;
};

export default render;
