import checkCollision, {
  checkCollisionLeft,
  checkCollisionRight,
} from './collision';
import freezeBlock from './freezeBlock';
import rotate from '../rotation';
import wallKick from './wallKick';
import getNextBlock from './getNextBlock';

const maxColumn = 9;
const maxRow = 22;
const minColumn = 0;

const update = (
  state: GameState,
  lastPressed: string,
  clearLastPressed: () => void,
): GameState => {
  const {blockColumn, blockRow} = state;

  /* fast drop */
  if (lastPressed === 'space') {
    let row = blockRow;
    while (!checkCollision(blockColumn, row + 1, state.columns, state.block)) {
      row++;
    }
    state.blockRow = row;
    state.downPressCount = 2;
  }

  /* rotate */
  if (lastPressed === 'r') {
    const rotatedBlock = {
      ...state.block,
      layout: rotate([...state.block.layout]),
    };
    if (
      !checkCollision(blockColumn, blockRow, state.columns, rotatedBlock) &&
      !checkCollisionRight(
        blockColumn,
        blockRow,
        state.columns,
        rotatedBlock,
      ) &&
      !checkCollisionLeft(blockColumn, blockRow, state.columns, rotatedBlock)
    ) {
      state.block = rotatedBlock;
    } else {
      const [wallKickColumn, wallKickRow] = wallKick(
        blockColumn,
        blockRow,
        state.columns,
        rotatedBlock,
        maxColumn,
      );

      if (wallKickColumn !== 0) {
        state.block = rotatedBlock;
        state.blockColumn = state.blockColumn + wallKickColumn;
        state.blockRow = state.blockRow - wallKickRow;
      }

      clearLastPressed();
      return state;
    }
  }

  /* move right */
  if (lastPressed === 'l') {
    if (
      !checkCollisionRight(
        blockColumn + 1,
        blockRow,
        state.columns,
        state.block,
      )
    ) {
      state.blockColumn += 1;
    }
  }

  /* move left */
  if (lastPressed === 'h') {
    if (
      !checkCollisionLeft(blockColumn - 1, blockRow, state.columns, state.block)
    ) {
      state.blockColumn -= 1;
    }
  }

  const isColliding = checkCollision(
    state.blockColumn,
    state.blockRow + 1,
    state.columns,
    state.block,
  );

  /* move down */
  if (lastPressed === 'j' && !state.pendingFreeze) {
    if (!isColliding) {
      state.blockRow += 1;
    }
  }

  if (lastPressed === 'j' && state.pendingFreeze) {
    if (isColliding) {
      state.downPressCount++;
    }
  }

  if (isColliding) {
    if (state.downPressCount === 2) {
      state.columns = freezeBlock(
        state.block,
        state.blockColumn,
        state.blockRow,
        state.columns,
      );

      state = getNextBlock(state);
      state.downPressCount = 0;
      clearLastPressed();

      return state;
    }

    if (state.pendingFreeze) {
      if (state.pendingFreezeTTL <= 0) {
        state.columns = freezeBlock(
          state.block,
          state.blockColumn,
          state.blockRow,
          state.columns,
        );

        state = getNextBlock(state);
      }
    } else {
      state.pendingFreeze = true;
      state.pendingFreezeTTL = 2;
    }
  } else {
    if (state.pendingFreeze) {
      state.pendingFreeze = false;
      state.pendingFreezeTTL = 0;
    }
  }

  clearLastPressed();

  return state;
};

export default update;
