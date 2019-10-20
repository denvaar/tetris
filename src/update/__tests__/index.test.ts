import update from '../index';
import * as rotate from '../../rotation';

describe('update', () => {
  test('activePiece is rotated when lastPressed is "r"', () => {
    const block: Tetrominoe = {
      color: '',
      // prettier-ignore
      layout: [
        1, 1, 1,
        0, 1, 0,
        0, 0, 0
      ]
    };
    const rotatedBlock: Tetrominoe = {
      color: '',
      // prettier-ignore
      layout: [
        0, 0, 1,
        0, 1, 1,
        0, 0, 1
      ]
    };
    const state: GameState = {
      prevScreenData: null,
      block,
      blockColumn: 0,
      blockRow: 0,
      columns: [],
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
