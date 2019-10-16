import rotate from '../rotation';
import {offsetPieceBottom, offsetPieceLeft, offsetPieceRight} from './offsets';

const update = (
  state: GameState,
  lastPressed: string,
  clearLastPressed: () => void,
): GameState => {
  const minColumn = 3;
  const maxColumn = 12;
  const maxRow = 23;
  const {activePieceX, activePieceY} = state;

  if (lastPressed === 'r') {
    state.activePiece = rotate(state.activePiece);
  }
  if (lastPressed === 'l') {
    const xOffset = offsetPieceRight(state.activePiece);
    if (activePieceX < maxColumn - xOffset) {
      state.activePieceX += 1;
    }
  }
  if (lastPressed === 'h') {
    const xOffset = offsetPieceLeft(state.activePiece);
    if (activePieceX > minColumn - xOffset) {
      state.activePieceX -= 1;
    }
  }
  if (lastPressed === 'j') {
    const yOffset = offsetPieceBottom(state.activePiece);
    if (activePieceY + yOffset < maxRow) {
      state.activePieceY += 1;
    }
  }
  clearLastPressed();

  return state;
};

export default update;
