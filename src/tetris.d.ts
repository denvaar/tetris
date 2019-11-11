interface Tetrominoe {
  color: Color;
  layout: number[];
}

interface FrozenTetrominoe {
  color: Color | null;
  value: number;
}

interface ScreenInfoValue {
  color: null | string;
  value: string;
}

interface Color {
  bright: string;
  normal: string;
}

interface ColorInfo {
  blue: Color;
  cyan: Color;
  green: Color;
  red: Color;
  yellow: Color;
  purple: Color;
  pink: Color;
  gray: Color;
  white: Color;
  reset: string;
}

type ScreenInfo = {
  [key: string]: ScreenInfoValue;
};

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface GameState {
  gameOver: boolean;
  block: Tetrominoe; // Object representing the falling block
  blockBag: number[]; // array of 7 randomly generated block indecies to pull from
  blockColumn: number; // Column of the falling block
  blockRow: number; // Row of the falling block
  columns: FrozenTetrominoe[][]; // 2d array of 1s and 0s representing frozen blocks
  downPressCount: number;
  level: Level; // Self explanitory
  nextBlocks: number[]; // array of the 3 next block indecies
  pendingFreeze: boolean; // true for a moment when a block collides
  pendingFreezeTTL: number; // Amount of time before a block will freeze
  prevScreen: null | ScreenInfo; // Object representing each cell in the last rendered screen
  preventSaveBlock: boolean;
  savedBlock: Tetrominoe | null;
  score: number;
  rowClearCount: number; // resets at 10
}

interface GameConfig {
  controls: {
    left: string;
    right: string;
    down: string;
    hardDrop: string;
    rotate: string;
    saveBlock: string;
  };
  musicEnabled: boolean;
  soundEffectsEnabled: boolean;
  pauseDataFile: string;
}
