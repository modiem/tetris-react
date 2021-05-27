import { useCallback, useEffect, useState } from "react";
import data, {clearRows} from "../gameHelper";
import type { Player } from "./usePlayer";
import type { Tetrimino } from "../gameHelper";


const COLS = data.StageObj.COLS;
const ROWS = data.StageObj.ROWS;

export type StageState = Array<Array<Tetrimino | 0>>; //string | 0 [][];

const emptyStage: StageState = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(0)
);



const useStage = () => {
  const [stageState, setStage] = useState(emptyStage);

  const renewStage = (playerState: Player) => {
    const newStage: StageState = JSON.parse(JSON.stringify(stageState));
    playerState.shape.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell !== 0) {
          newStage[playerState.y + y][playerState.x + x] = cell;
        }
      })
    );
    const [newState, rows] = clearRows(newStage);
    setStage(() => newState);
      //useRedux for score
  };

  const clearStage = () => {
    setStage(() => {
      return emptyStage;
    });
  };

  return [stageState, renewStage, clearStage] as const;
};

export default useStage;
