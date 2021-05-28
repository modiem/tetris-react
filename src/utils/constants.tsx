import type {StageState} from './types';

const data = {
  COLS: 10,
  ROWS: 20,
  BLOCK_SIZE: 30,
  BG_COLOR: `rgba(104, 66, 126, 0.4)`,
};

export const emptyStage: StageState = Array.from({ length: data.ROWS }, () =>
  Array(data.COLS).fill(0)
);

export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
  NONE: 0,
};

type levelType = {[k:number]:number}

export const LEVEL:levelType = {
  
  1: 800,
  2: 720,
  3: 630,
  4: 550,
  5: 470,
  6: 380,
  7: 300,
  8: 220,
  9: 130,
  10: 100,
  11: 80,
  12: 80,
  13: 80,
  14: 70,
  15: 70,
  16: 70,
  17: 50,
  18: 50,
  19: 50,
  20: 30,
  // 29+ is 20ms
};

export default data;
