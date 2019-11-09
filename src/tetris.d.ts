interface Tetrominoe {
  color: string;
  layout: number[];
}

interface FrozenTetrominoe {
  color: string | null;
  value: number;
}

interface ScreenInfoValue {
  color: null | string;
  value: string;
}

type ScreenInfo = {
  [key: string]: ScreenInfoValue;
};

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface GameState {
  preventSaveBlock: boolean;
  savedBlock: Tetrominoe | null;
  blockBag: number[]; // array of 7 randomly generated block indecies to pull from
  nextBlocks: number[]; // array of the 3 next block indecies
  prevScreen: null | ScreenInfo; // Object representing each cell in the last rendered screen
  block: Tetrominoe; // Object representing the falling block
  blockColumn: number; // Column of the falling block
  blockRow: number; // Row of the falling block
  columns: FrozenTetrominoe[][]; // 2d array of 1s and 0s representing frozen blocks
  level: Level; // Self explanitory
  pendingFreezeTTL: number; // Amount of time before a block will freeze
  pendingFreeze: boolean; // true for a moment when a block collides
  downPressCount: number;
}
