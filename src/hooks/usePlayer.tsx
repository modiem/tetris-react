import { useReducer, useEffect } from "react";
import { TetriminosObj } from "../gameHelper";
import type { Tetrimino } from "../gameHelper";
import type { StageState } from "./useStage";
import { rotate, isValid } from "../gameHelper";

export type Player = {
  x: number;
  y: number;
  shape: (Tetrimino | 0)[][];
  color: string;
  isCollided: boolean;
  next: Tetrimino;
};

function randomType(): Tetrimino {
  const lst = Object.keys(TetriminosObj) as Array<Tetrimino>;
  return lst[Math.floor(Math.random() * 7)];
}

function createNewPlayer(type: Tetrimino = "L"): Player {
  const shape = TetriminosObj[type].shape;
  const color = TetriminosObj[type].color;
  return {
    x: 4,
    y: 0, //-(shape.length),
    shape: shape,
    color: color,
    isCollided: false,
    next: randomType(),
  };
}

function reducer(
  prevState: Player,
  action: { type: string; payload?: StageState }
): Player {
  switch (action.type) {
    case "Reset": {
      //get next player
      const newPlayer = createNewPlayer(prevState.next);
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
      };
      return {
        ...newPlayer,
        y: newPlayer.y -1,
        isCollided:true,
      };
    }
    default:
      return prevState;
  }
}

const usePlayer = () => {
  const [playerState, dispatchPlayer] = useReducer(reducer, createNewPlayer());

  return [playerState, dispatchPlayer] as const;
};

export default usePlayer;
