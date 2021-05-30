import type { Tetrimino } from "./types";

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
    color: "#3d84b8",
  },
  I: {
    shape: [["I", "I", "I", "I"]],
    color: "#e25822",
  },
  J: {
    shape: [
      [0, "J"],
      [0, "J"],
      ["J", "J"],
    ],
    color: "#006a71",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "#f1bc31",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
    ],
    color: "#a9294f",
  },
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "#ad62aa",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
    ],
    color: "#206a5d",
  },
};
