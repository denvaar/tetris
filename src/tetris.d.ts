interface Tetrominoe {
  color: string;
  layout: number[];
}

type ScreenData = {
  [key: string]: string;
};

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface GameState {
  prevScreenData: null | ScreenData; // TBD
  block: Tetrominoe; // Object representing the falling block
  blockColumn: number; // Column of the falling block
  blockRow: number; // Row of the falling block
  columns: Array<Array<number>>; // 2d array of 1s and 0s representing frozen blocks
  level: Level; // Self explanitory
  pendingFreezeTTL: number; // Amount of time before a block will freeze
  pendingFreeze: boolean; // true for a moment when a block collides
  downPressCount: number;
}
