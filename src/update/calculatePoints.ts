const calculatePoints = (rows: number, level: number): number => {
  if (rows === 1) {
    return 40 * level;
  } else if (rows === 2) {
    return 100 * level;
  } else if (rows === 3) {
    return 300 * level;
  } else if (rows >= 4) {
    return 1200 * level;
  }

  return 0;
};

export default calculatePoints;
