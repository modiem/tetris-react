import type { Player, Tetrimino, StageState } from "./types";
import { TETRIMINOS } from "./tetriminos";
import data from "./constants";

export function randomTetri(): Tetrimino {
  const lst = Object.keys(TETRIMINOS) as Array<Tetrimino>;
  return lst[Math.floor(Math.random() * 7)];
}

export function rotate(p: (0 | Tetrimino)[][]) {
  // Transpose matrix, p is the Piece
  const newP = Array.from({ length: p[0].length }, () =>
    Array(p.length).fill(0)
  );

  for (let y = 0; y < p.length; y++) {
    for (let x = 0; x < p[0].length; x++) {
      newP[x][y] = p[y][x];
    }
  }

  // Reverse the order of the columns.
  newP.forEach((row) => row.reverse());
  return newP;
}

export function isValid(playerState: Player, stage: StageState) {
  const { x: posX, y: posY, shape } = playerState;

  if (posX < 0 || posX + shape[0].length > data.COLS) {
    return false;
  } else if (posY + shape.length > data.ROWS) {
    return false;
  } else if (
    //check collision
    shape.some((row, y) =>
      row.some(
        (element, x) =>
          posY + y >= 0 && element !== 0 && stage[posY + y][posX + x] !== 0
      )
    )
  ) {
    return false;
  } else {
    return true;
  }
}

export const clearRows = (arr: StageState) => {
  let clearedRows = 0;
  const newArr: StageState = [];
  arr.forEach((row, y) => {
    if (!row.some((ele) => ele === 0)) {
      clearedRows++;
      newArr.unshift(Array(data.COLS).fill(0));
    } else {
      newArr.push(row);
    }
  });
  return [newArr, clearedRows] as const;
};
