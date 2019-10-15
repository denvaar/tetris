type Tetrominoe = number[];

type ScreenData = {
  [key: string]: string;
};

interface GameState {
  prevScreenData: null | ScreenData;
  activePiece: Tetrominoe;
  activePieceX: number;
  activePieceY: number;
}
