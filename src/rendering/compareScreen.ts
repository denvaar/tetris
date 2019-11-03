const compareScreen = (
  prev: ScreenInfo | null,
  current: ScreenInfo,
): ScreenInfo => {
  return Object.keys(current).reduce((screenDiff: ScreenInfo, k: string) => {
    const currentColor = current[k].color;
    const currentValue = current[k].value;

    if (prev && prev[k]) {
      const prevColor = prev[k].color;
      const prevValue = prev[k].value;

      if (currentColor !== prevColor || currentValue !== prevValue) {
        screenDiff[k] = {
          color: currentColor,
          value: currentValue,
        };
      }
    } else {
      screenDiff[k] = {
        color: currentColor,
        value: currentValue,
      };
    }

    return screenDiff;
  }, {});
};

export default compareScreen;
