import checkCollision, {
  checkCollisionLeft,
  checkCollisionRight,
} from './collision';
import freezeBlock from './freezeBlock';
import rotate from '../rotation';
import wallKick from './wallKick';
import getNextBlock from './getNextBlock';
import tetrominoes from '../tetrominoes';
import fillBag from '../utils/fillBag';
import AudioService from '../utils/sounds';

const maxColumn = 9;

const update = (
  state: GameState,
  config: any,
  lastPressed: string,
  clearLastPressed: () => void,
): GameState => {
  const {blockColumn, blockRow} = state;

  /* pause game */
  if (lastPressed === 'p') {
    const fs = require('fs');
    state.prevScreen = null;
    fs.writeFileSync('/tmp/tetris', JSON.stringify(state));
    process.exit(0);
  }

  /* save block */
  if (lastPressed === config.controls.saveBlock && !state.preventSaveBlock) {
    if (state.savedBlock === null) {
      // get next block from upcoming blocks
      state.savedBlock = state.block;
      const nextBlockIndex = state.nextBlocks.shift();
      const queuedBlockIndex = state.blockBag.shift();
      state.nextBlocks.push(queuedBlockIndex as number);
      if (state.blockBag.length === 0) {
        state.blockBag = fillBag();
      }
      state.block = tetrominoes[nextBlockIndex as number];
    } else {
      // swap previously saved block current block
      const temp = state.savedBlock;
      state.savedBlock = state.block;
      state.block = temp;
    }

    state.preventSaveBlock = true;
  }

  /* fast drop */
  if (lastPressed === config.controls.hardDrop) {
    let row = blockRow;
    while (!checkCollision(blockColumn, row + 1, state.columns, state.block)) {
      row++;
    }
    state.blockRow = row;
    state.downPressCount = 2;
  }

  /* rotate */
  if (lastPressed === config.controls.rotate) {
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
  if (lastPressed === config.controls.right) {
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
  if (lastPressed === config.controls.left) {
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
  if (lastPressed === config.controls.down && !state.pendingFreeze) {
    if (!isColliding) {
      state.blockRow += 1;
    }
  }

  if (lastPressed === config.controls.down && state.pendingFreeze) {
    if (isColliding) {
      state.downPressCount++;
    }
  }

  if (isColliding) {
    if (state.downPressCount === 2) {
      if (config.soundEffectsEnabled === true) {
        AudioService.getInstance().playBlockFreezeSound();
      }
      state.columns = freezeBlock(
        state.block,
        state.blockColumn,
        state.blockRow,
        state.columns,
      );

      state = getNextBlock(state, config);
      state.downPressCount = 0;
      clearLastPressed();

      return state;
    }

    if (state.pendingFreeze) {
      if (state.pendingFreezeTTL <= 0) {
        if (config.soundEffectsEnabled === true) {
          AudioService.getInstance().playBlockFreezeSound();
        }
        state.columns = freezeBlock(
          state.block,
          state.blockColumn,
          state.blockRow,
          state.columns,
        );

        state = getNextBlock(state, config);
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
