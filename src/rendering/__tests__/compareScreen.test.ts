import compareScreen from '../compareScreen';

describe('compareScreen', () => {
  it('returns only key-value pairs of cells that have changed', () => {
    const prevScreen: ScreenInfo = {
      '0,0': {color: 'red', value: 'A'},
      '0,1': {color: 'green', value: 'B'},
      '0,2': {color: 'blue', value: 'C'},
    };

    const screen: ScreenInfo = {
      '0,0': {color: null, value: 'a'},
      '0,1': {color: 'red', value: 'B'},
      '0,2': {color: 'blue', value: 'C'},
      '0,3': {color: null, value: 'D'},
    };

    const diff = compareScreen(prevScreen, screen);

    expect(diff).toEqual({
      '0,0': {color: null, value: 'a'},
      '0,1': {color: 'red', value: 'B'},
      '0,3': {color: null, value: 'D'},
    });
  });

  it('returns key-value pairs that changed after block rotate', () => {
    const prevScreen: ScreenInfo = {
      '0,0': {color: 'a', value: ' '},
      '0,1': {color: 'a', value: ' '},
      '0,2': {color: 'a', value: ' '},

      '1,0': {color: 'a', value: ' '},
      '1,1': {color: 'a', value: 'x'},
      '1,2': {color: 'a', value: ' '},

      '2,0': {color: 'a', value: 'x'},
      '2,1': {color: 'a', value: 'x'},
      '2,2': {color: 'a', value: 'x'},
    };
    const screen: ScreenInfo = {
      '0,0': {color: 'a', value: 'x'},
      '0,1': {color: 'a', value: 'x'},
      '0,2': {color: 'a', value: 'x'},

      '1,0': {color: 'a', value: ' '},
      '1,1': {color: 'a', value: 'x'},
      '1,2': {color: 'a', value: ' '},

      '2,0': {color: 'a', value: ' '},
      '2,1': {color: 'a', value: ' '},
      '2,2': {color: 'a', value: ' '},
    };
    const diff = compareScreen(prevScreen, screen);

    expect(diff).toEqual({
      '0,0': {color: 'a', value: 'x'},
      '0,1': {color: 'a', value: 'x'},
      '0,2': {color: 'a', value: 'x'},
      '2,0': {color: 'a', value: ' '},
      '2,1': {color: 'a', value: ' '},
      '2,2': {color: 'a', value: ' '},
    });
  });
});
