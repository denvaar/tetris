import writeScreen from '../writeScreen';
import colors from '../../utils/colors';

describe('writeScreen', () => {
  it('calls `process.stdout.write` with expected ASCII text argument', () => {
    const diff: ScreenInfo = {
      '2,2': {color: null, value: 'a'},
      '3,2': {color: colors.red, value: 'B'},
      '3,3': {color: colors.red, value: 'c'},
      '5,4': {color: colors.red, value: 'Q'},
      '5,6': {color: null, value: ' '},
    };

    const spy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(input => true);

    writeScreen(diff);
    expect(spy).toHaveBeenCalledWith(
      '\x1b[2;2Ha\x1b[2;3H\x1b[31mB\x1b[3;3Hc\x1b[4;5HQ\x1b[6;5H ' +
        colors.reset,
    );
  });
});
