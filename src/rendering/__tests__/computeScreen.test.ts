import colors from '../../utils/colors';
import computeScreen from '../computeScreen';

describe('computeScreen', () => {
  const FULL_CELL = '█';
  const EMPTY_CELL = ' ';
  const {lightGray, darkGray} = colors;

  it('computes walls and floor of game board', () => {
    const block: Tetrominoe = {
      color: '',
      // prettier-ignore
      layout: [
        0, 0 ,0,
        0, 1 ,0,
        1, 1 ,1,
      ]
    };

    const screen = computeScreen(
      4,
      2,
      4,
      2,
      block,
      0,
      0,
      [[]],
      [0, 0, 0],
      null,
    );
    expect(screen).toEqual(
      expect.objectContaining({
        // prettier-ignore
        '3,3': {color: lightGray, value: FULL_CELL},
        '4,3': {color: null, value: EMPTY_CELL},
        '5,3': {color: lightGray, value: FULL_CELL},
        '6,3': {color: lightGray, value: FULL_CELL},

        // prettier-ignore
        '3,4': {color: lightGray, value: FULL_CELL},
        '4,4': {color: lightGray, value: FULL_CELL},
        '5,4': {color: '', value: FULL_CELL},
        '6,4': {color: lightGray, value: FULL_CELL},

        // prettier-ignore
        '3,5': {color: lightGray, value: FULL_CELL},
        '4,5': {color: '', value: FULL_CELL},
        '5,5': {color: '', value: FULL_CELL},
        '6,5': {color: '', value: FULL_CELL},

        // prettier-ignore
        '3,6': {color: lightGray, value: FULL_CELL},
        '4,6': {color: lightGray, value: FULL_CELL},
        '5,6': {color: lightGray, value: FULL_CELL},
        '6,6': {color: lightGray, value: FULL_CELL},
      }),
    );
  });
});
