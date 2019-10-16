import update from '../index';
import * as rotate from '../../rotation';

describe('update', () => {
  test('activePiece is rotated when lastPressed is "r"', () => {
    // prettier-ignore
    const activePiece: Tetrominoe = [
      1, 1, 1,
      0, 1, 0,
      0, 0, 0
    ];
    // prettier-ignore
    const rotatedPiece: Tetrominoe = [
      0, 0, 1,
      0, 1, 1,
      0, 0, 1
    ];
    const state: GameState = {
      prevScreenData: null,
      activePiece,
      activePieceX: 0,
      activePieceY: 0,
    };
    const lastPressed = 'r';

    const rotateSpy = jest
      .spyOn(rotate, 'default')
      .mockImplementation(() => rotatedPiece);

    const nextState: GameState = update(state, lastPressed, () => {});
    expect(nextState.activePiece).toEqual(rotatedPiece);
    expect(rotateSpy).toHaveBeenCalledWith(activePiece);
  });

  /* TODO: wite tests for other branches of the `update` function */
});
