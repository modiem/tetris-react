import { useState } from "react";

export type GameState = {
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPause: boolean;
};

const initialState: GameState = {
  score: 0,
  level: 0,
  lines: 0,
  isGameOver: true,
  isPause: false,
};

const useGame = () => {
  const [gameState, setGameState] = useState(initialState);

  function toggleStartGame() {
    setGameState((prev) => {
      return {
        ...prev,
        isGameOver: !prev.isGameOver,
      };
    });
  }

  function togglePause() {
    setGameState((prev) => {
      return {
        ...prev,
        isPause: !prev.isPause,
      };
    });
  }

  function logScore(lines: number, score: number) {
    setGameState((prev) => {
      return {
        ...prev,
        score: prev.score + score,
        lines: prev.lines + lines,
      };
    });
  }

  const incrementLevel = () => {
    setGameState((prev) => {
      return {
        ...prev,
        level: prev.level++,
      };
    });
  };

  return [gameState, toggleStartGame, togglePause,logScore, incrementLevel] as const;
};

export default useGame;
