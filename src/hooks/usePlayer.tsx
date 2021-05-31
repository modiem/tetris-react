import { useReducer, useEffect } from "react";
import { TETRIMINOS } from "../utils/tetriminos";
import { LEVEL } from "../utils/constants";
import type { Player, Tetrimino, StageState, GameState } from "../utils/types";
import { randomTetri, rotate, isValid } from "../utils/functions";

function createNewPlayer(type: Tetrimino = "L"): Player {
  const shape = TETRIMINOS[type].shape;
  const color = TETRIMINOS[type].color;
  return {
    x: 4,
    y: 0,
    shape: shape,
    color: color,
    isCollided: false,
    dropType: "NONE",
    next: randomTetri(),
  };
}

function reducer(
  prevState: Player,
  action: { type: string; payload?: StageState }
): Player {
  switch (action.type) {
    case "Reset": {
      //get next player
      const newPlayer = createNewPlayer(prevState.next)

      //assign the former next player to new player
      return newPlayer;
    }
    case "ArrowDown": {
      const newPlayer = {
        ...prevState,
        y: prevState.y + 1,
      };
      if (isValid(newPlayer, action.payload!)) {
        return newPlayer;
      } else {
        return {
          ...prevState,
          dropType: "SOFT_DROP",
          isCollided: true,
        };
      }
    }
    case "ArrowLeft": {
      const newPlayer = {
        ...prevState,
        x: prevState.x - 1,
      };
      if (isValid(newPlayer, action.payload!)) {
        return newPlayer;
      } else {
        return prevState;
      }
    }
    case "ArrowRight": {
      const newPlayer = {
        ...prevState,
        x: prevState.x + 1,
      };
      if (isValid(newPlayer, action.payload!)) {
        return newPlayer;
      } else {
        return prevState;
      }
    }
    case "ArrowUp": {
      const newPlayer = {
        ...prevState,
        shape: rotate(prevState.shape),
      };
      if (isValid(newPlayer, action.payload!)) {
        return newPlayer;
      } else {
        return prevState;
      }
    }
    case "Space": {
      let newPlayer = prevState;
      while (isValid(newPlayer, action.payload!)) {
        newPlayer = {
          ...newPlayer,
          y: newPlayer.y + 1,
        };
      }
      return {
        ...newPlayer,
        y: newPlayer.y - 1,
        isCollided: true,
        dropType: "HARD_DROP",
      };
    }
    default:
      return prevState;
  }
}

const usePlayer = (stageState: StageState, gameState: GameState) => {
  const [playerState, dispatchPlayer] = useReducer(reducer, createNewPlayer());

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (!gameState.isGameOver && !gameState.isPause) {
      id = setInterval(
        () => dispatchPlayer({ type: "ArrowDown", payload: stageState }),
        LEVEL[gameState.level]
      );
    }
    return () => {
      clearInterval(id);
    };
  }, [playerState, gameState, stageState]);

  return [playerState, dispatchPlayer] as const;
};

export default usePlayer;
