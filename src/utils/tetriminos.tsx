import type {Tetrimino} from './types';

type tetriObj = {
  [key in Tetrimino]: {
    shape: (0 | Tetrimino)[][];
    color: string;
  };
};

export const TETRIMINOS: tetriObj = {
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

