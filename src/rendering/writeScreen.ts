import colors from '../utils/colors';

const moveCursorTo = (
  column: number | string,
  row: number | string,
): string => {
  return `\x1b[${row};${column}H`;
};

const writeScreen = (screenDiff: ScreenInfo): void => {
  let lastColor: null | string = null;

  const text =
    Object.keys(screenDiff).reduce((asciiText: string, pos: string) => {
      const [column, row] = pos.split(',');
      const color = screenDiff[pos].color;

      asciiText += moveCursorTo(column, row);

      /* only change color if needed */
      if (color && lastColor !== color) {
        asciiText += color;
      }

      asciiText += screenDiff[pos].value;

      lastColor = color;

      return asciiText;
    }, '') + colors.reset;

  process.stdout.write(text);
};

export default writeScreen;
