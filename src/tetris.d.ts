interface Tetrominoe {
  color: string;
  layout: number[];
}

type ScreenData = {
  [key: string]: string;
};

interface GameState {
  prevScreenData: null | ScreenData;
  block: Tetrominoe;
  blockColumn: number;
  blockRow: number;
  columns: Array<Array<number>>;
}
