export const offsetPieceLeft = (piece: number[]): number => {
  const root = Math.sqrt(piece.length);
  for (let col = 0; col < root; col++) {
    for (let row = 0; row <= piece.length - root; row += root) {
      if (piece[row + col] === 1) return col;
    }
  }

  return 0;
};

export const offsetPieceRight = (piece: number[]): number => {
  const root = Math.sqrt(piece.length);
  for (let col = root - 1; col >= 0; col--) {
    for (let row = piece.length - root; row >= 0; row -= root) {
      if (piece[row + col] === 1) return col;
    }
  }

  return 0;
};

export const offsetPieceBottom = (piece: number[]): number => {
  const root = Math.sqrt(piece.length);

  for (let row = root - 1; row >= 0; row--) {
    for (let col = 0; col < root; col++) {
      const index = root * row + col;
      if (piece[index] === 1) return row;
    }
  }

  return 0;
};
