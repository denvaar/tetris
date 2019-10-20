export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const iterateColumns = (
  size: number,
  callback: (columnOffset: number, rowOffset: number) => void,
): void => {
  for (let columnOffset = 0; columnOffset < size; columnOffset++) {
    for (let rowOffset = 0; rowOffset < size; rowOffset++) {
      callback(columnOffset, rowOffset);
    }
  }
};
