import React, { useEffect, useRef } from "react";
import { drawSquare } from "../../utils/functions";
import { GameState, Player } from "../../utils/types";
import { TETRIMINOS } from "../../utils/tetriminos";
import data from "../../utils/constants";
import classes from "./Next.module.css";

const Next: React.FC<{
  playerState: Player;
  gameState: GameState;
}> = ({ playerState, gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!gameState.isGameOver) {
      const canvas = canvasRef.current;
      const ctx = canvas!.getContext("2d");

      const nextShape = TETRIMINOS[playerState.next].shape;
      const color = TETRIMINOS[playerState.next].color;

      const BLOCK_SIZE = data.BLOCK_SIZE;
      ctx!.canvas.width = nextShape[0].length * BLOCK_SIZE;
      ctx!.canvas.height = nextShape.length * BLOCK_SIZE;

      ctx!.scale(BLOCK_SIZE, BLOCK_SIZE);

      //clear State
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.beginPath();

      nextShape.forEach((row, y) =>
        row.forEach((element, x) => {
          if (element !== 0) {
            drawSquare(color, x, y, ctx!);
          }
        })
      );
    }
  }, [playerState, gameState.isGameOver]);

  return <canvas ref={canvasRef} className={classes.next}/>;
};
export default Next;
