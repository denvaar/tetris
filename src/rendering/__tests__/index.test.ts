import render from '../index';
import * as computeScreen from '../computeScreen';
import * as compareScreen from '../compareScreen';
import * as writeScreen from '../writeScreen';

describe('render', () => {
  it('computes, compares, and writes ascii text to the screen', () => {
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
    const columns: FrozenTetrominoe[][] = Array.from({length: 10}, () =>
      Array.from({length: 24}, () => ({value: 0, color: null})),
    );
    const prevScreen: ScreenInfo = {
      '2,4': {color: null, value: ' '},
      '2,5': {color: 'red', value: 'x'},
      '2,6': {color: 'green', value: 'x'},
      '2,7': {color: 'blue', value: 'x'},
    };
    const currentScreen: ScreenInfo = {
      '2,4': {color: null, value: ' '},
      '2,5': {color: 'red', value: ' '},
      '2,6': {color: 'green', value: 'x'},
      '2,7': {color: 'blue', value: ' '},
    };
    const expectedScreenDiff: ScreenInfo = {
      '2,5': {color: 'red', value: ' '},
      '2,7': {color: 'blue', value: ' '},
    };
    const state: GameState = {
      gameOver: false,
      rowClearCount: 0,
      score: 0,
      preventSaveBlock: false,
      savedBlock: null,
      blockBag: [],
      nextBlocks: [0, 0, 0],
      prevScreen,
      downPressCount: 0,
      pendingFreezeTTL: 0,
      pendingFreeze: false,
      block,
      blockColumn: 0,
      blockRow: 0,
      columns,
      level: 1,
    };

    const computeScreenSpy = jest
      .spyOn(computeScreen, 'default')
      .mockReturnValue(currentScreen);

    const compareScreenSpy = jest
      .spyOn(compareScreen, 'default')
      .mockReturnValue(expectedScreenDiff);

    const writeScreenSpy = jest
      .spyOn(writeScreen, 'default')
      .mockImplementation();

    const nextState = render(state);

    expect(computeScreenSpy).toHaveBeenCalledWith(
      12,
      7,
      25,
      2,
      state.block,
      state.blockColumn,
      state.blockRow,
      state.columns,
      state.nextBlocks,
      state.savedBlock,
      state.score,
      state.level,
    );
    expect(compareScreenSpy).toHaveBeenCalledWith(prevScreen, currentScreen);
    expect(writeScreenSpy).toHaveBeenCalledWith(expectedScreenDiff);
    expect(nextState.prevScreen).toEqual(currentScreen);
  });
});
