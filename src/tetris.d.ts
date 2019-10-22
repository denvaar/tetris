interface Tetrominoe {
  color: string;
  layout: number[];
}

type ScreenData = {
  [key: string]: string;
};

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface GameState {
  prevScreenData: null | ScreenData;
  block: Tetrominoe;
  blockColumn: number;
  blockRow: number;
  columns: Array<Array<number>>;
  level: Level;
}
