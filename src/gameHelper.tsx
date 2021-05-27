import type { StageState } from "./hooks/useStage";
import type {Player} from './hooks/usePlayer';

export type Tetrimino = "L" | "I" | "O" | "T" | "Z" | "S" | "J";
type tetriObj = {
  [key in Tetrimino]: {
    shape: (0 | Tetrimino)[][];
    color: string;
  };
};

export const TetriminosObj: tetriObj = {
  L: {
    shape: [
      ["L", 0],
      ["L", 0],
      ["L", "L"],
    ],
    color: `rgb(252, 107, 3)`,
  },
  I: {
    shape: [["I"], ["I"], ["I"], ["I"]],
    color: "orange",
  },
  J: {
    shape: [
      [0, "J"],
      [0, "J"],
      ["J", "J"],
    ],
    color: "blue",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "yellow",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
    ],
    color: "green",
  },
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "purple",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
    ],
    color: "red",
  },
};

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

export function isValid(
  playerState: Player,
  stage: StageState
) {
  const {x:posX, y:posY, shape} = playerState;

  if (posX < 0 || posX + shape[0].length > data.StageObj.COLS) {
    return false;
  } else if (posY + shape.length > data.StageObj.ROWS) {
    return false;
  } else if (
    //check collision
    !shape.every((row, y) =>
      row.every(
        (element, x) => stage[posY + y][posX + x] === 0 || element === 0
      )
    )
  ) {
    return false;
  } else {
    return true;
  }
};

export const clearRows = (arr: StageState) => {
  let rows: number = 0;
  const newArr: StageState = [];
  arr.forEach((row, y) => {
    if (!row.some((ele) => ele === 0)) {
      rows++;
      newArr.unshift(Array(data.StageObj.COLS).fill(0));
    } else {
      newArr.push(row);
    }
  });
  return [newArr, rows] as const;
};

const data = {
  StageObj: {
    COLS: 10,
    ROWS: 20,
    BLOCK_SIZE: 30,
    BG_COLOR: `rgba(104, 66, 126, 0.4)`,
  },
};
export default data;
