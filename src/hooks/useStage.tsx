import { useState } from "react";
import { emptyStage } from "../utils/constants";
import { clearRows } from "../utils/functions";
import type { Player, StageState } from "../utils/types";

const useStage = () => {
  const [stageState, setStage] = useState(emptyStage);


  const renewStage = (playerState: Player) => {
      const newStage: StageState = JSON.parse(JSON.stringify(stageState));
      playerState.shape.forEach((row, y) => {
        if (playerState.y + y >= 0) {
          row.forEach((cell, x) => {
            if (cell !== 0) {
              newStage[playerState.y + y][playerState.x + x] = cell;
            }
          });
        }
      });
    const [newState, clearedRows] = clearRows(newStage);
    setStage(() => newState);
    return clearedRows;
  };

  const clearStage = () => {
    setStage(() => {
      return emptyStage;
    });
  };

  return [stageState, renewStage, clearStage] as const;
};

export default useStage;
