import update from '../index';
import * as rotate from '../../rotation';
import {makeColumns} from '../../utils/testHelpers';

describe('update', () => {
  test('activePiece is rotated when lastPressed is "r"', () => {
    const color: Color = {
      normal: '',
      bright: '',
    };
    const block: Tetrominoe = {
      color,
      // prettier-ignore
      layout: [
        1, 1, 1,
        0, 1, 0,
        0, 0, 0
      ]
    };
    const rotatedBlock: Tetrominoe = {
      color,
      // prettier-ignore
      layout: [
        0, 0, 1,
        0, 1, 1,
        0, 0, 1
      ]
    };
    const state: GameState = {
      gameOver: false,
      rowClearCount: 0,
      score: 0,
      preventSaveBlock: false,
      savedBlock: null,
      blockBag: [],
      nextBlocks: [],
      downPressCount: 0,
      pendingFreezeTTL: 0,
      pendingFreeze: false,
      prevScreen: null,
      block,
      blockColumn: 0,
      blockRow: 0,
      // prettier-ignore
      columns: makeColumns([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]]),
      level: 1,
    };

    const lastPressed = 'r';
    const rotateSpy = jest
      .spyOn(rotate, 'default')
      .mockImplementation(() => rotatedBlock.layout);
    const nextState: GameState = update(state, lastPressed, () => {});
    expect(nextState.block).toEqual(rotatedBlock);
    expect(rotateSpy).toHaveBeenCalledWith(block.layout);
  });

  /* TODO: wite tests for other branches of the `update` function */
});
