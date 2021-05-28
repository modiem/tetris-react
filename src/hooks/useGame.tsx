import { useEffect, useReducer } from "react";
import type { GameState } from "../utils/types";

const initialState: GameState = {
  score: 0,
  level: 1,
  lines: 0,
  isGameOver: true,
  isPause: false,
};

type ActionType =
  | "ResetGame"
  | "SetGameOver"
  | "TogglePause"
  | "AddLines"
  | "ChangeScore"
  | "ChangeLevel";

function reducer(
  prevState: GameState,
  action: { type: ActionType; payload?: number }
): GameState {
  switch (action.type) {
    case "ResetGame": {
      return {
        ...initialState,
        isGameOver: false,
      };
    }
    case "SetGameOver": {
      return {
        ...prevState,
        isGameOver: true,
      };
    }
    case "TogglePause": {
      return {
        ...prevState,
        isPause: !prevState.isPause,
      };
    }
    case "AddLines": {
      return {
        ...prevState,
        lines: prevState.lines + action.payload!,
      };
    }
    case "ChangeScore": {
      return {
        ...prevState,
        score: prevState.score + action.payload!,
      };
    }
    case "ChangeLevel": {
      let level = prevState.level + action.payload!;
      if (level < 1) {
        level = 1;
      } else if (level > 20) {
        level = 20;
      } 
      return {
        ...prevState,
        level: level,
      };
    }
    default:
      return prevState;
  }
}

const useGame = () => {
  const [gameState, dispatchGame] = useReducer(reducer, initialState);

  const flooredLines = Math.floor(gameState.lines / 3);
  useEffect(() => {
    dispatchGame({ type: "ChangeLevel", payload: 1 });
  }, [flooredLines, dispatchGame]);

  return [gameState, dispatchGame] as const;
};

export default useGame;
