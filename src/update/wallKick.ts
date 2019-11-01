import checkCollision, {
  checkCollisionRight,
  checkCollisionLeft,
} from './collision';

const maxRowDelta = 3;
const maxColumnDelta = 2;

const wallKick = (
  blockColumn: number,
  blockRow: number,
  columns: FrozenTetrominoe[][],
  block: Tetrominoe,
  maxColumn: number,
): number[] => {
  for (let r = 0; r < maxRowDelta; r++) {
    for (let i = 1; i <= maxColumnDelta; i++) {
      if (
        !checkCollision(blockColumn + i, blockRow - r, columns, block) &&
        !checkCollisionLeft(blockColumn + i, blockRow - r, columns, block) &&
        !checkCollisionRight(blockColumn + i, blockRow - r, columns, block)
      ) {
        return [i, r];
      }

      if (
        !checkCollision(blockColumn - i, blockRow - r, columns, block) &&
        !checkCollisionLeft(blockColumn - i, blockRow - r, columns, block) &&
        !checkCollisionRight(blockColumn - i, blockRow - r, columns, block)
      ) {
        return [i * -1, r];
      }
    }
  }

  return [0, 0];
};

export default wallKick;
