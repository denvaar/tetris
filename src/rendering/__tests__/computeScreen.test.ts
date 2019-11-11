import colors from '../../utils/colors';
import computeScreen from '../computeScreen';

describe('computeScreen', () => {
  const FULL_CELL = '█';
  const EMPTY_CELL = ' ';
  const {gray} = colors;
  const color: Color = {
    bright: '',
    normal: '',
  };

  it('computes walls and floor of game board', () => {
    const block: Tetrominoe = {
      color,
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
      0,
      0,
    );
    expect(screen).toEqual(
      expect.objectContaining({
        // prettier-ignore
        '3,5': {color: gray.bright, value: FULL_CELL},
        '4,5': {color: '', value: FULL_CELL},
        '5,5': {color: '', value: FULL_CELL},
        '6,5': {color: '', value: FULL_CELL},

        // prettier-ignore
        '3,6': {color: gray.bright, value: FULL_CELL},
        '4,6': {color: gray.bright, value: FULL_CELL},
        '5,6': {color: gray.bright, value: FULL_CELL},
        '6,6': {color: gray.bright, value: FULL_CELL},
      }),
    );
  });
});
