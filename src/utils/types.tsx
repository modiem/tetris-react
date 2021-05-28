export type Tetrimino = "L" | "I" | "O" | "T" | "Z" | "S" | "J";

export type Player = {
  x: number;
  y: number;
  shape: (Tetrimino | 0)[][];
  color: string;
  isCollided: boolean;
  dropType: 'SOFT_DROP' | 'HARD_DROP' | 'NONE';
  next: Tetrimino;
};

export type StageState = Array<Array<Tetrimino | 0>>; //string | 0 [][];

export type GameState = {
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPause: boolean;
};


