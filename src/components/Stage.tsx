import { useRef, useEffect } from "react";
import data from "../utils/constants";
import {TETRIMINOS} from '../utils/tetriminos';
import type { StageState, Player, GameState } from "../utils/types";



const COLS = data.COLS;
const ROWS = data.ROWS;
const BLOCK_SIZE = data.BLOCK_SIZE;

// window.requestAnimFrame = (function () {
//   return (
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     function (callback) {
//       window.setTimeout(callback, 1000 / 60);
//     }
//   );
// })();

function drawSquare(
  color: string | 0,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D
) {
  if (color !== 0) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }
};

const Stage: React.FC<{
  className: string;
  stageState: StageState;
  playerState: Player;
  gameState: GameState;
}> = ({ playerState, stageState, className, gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    // Calculate size of canvas from constants.
    ctx!.canvas.width = COLS * BLOCK_SIZE;
    ctx!.canvas.height = ROWS * BLOCK_SIZE;

    // Scale blocks
    ctx!.scale(BLOCK_SIZE, BLOCK_SIZE);

    if (!gameState.isGameOver) {
      //clear State
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.beginPath()
  
      //draw stage
      stageState.forEach((row, y) =>
        row.forEach((col, x) => {
          if (col !== 0) {
            const color = TETRIMINOS[col].color
            drawSquare(color, x, y, ctx!);
          }
        })
      );
  
      //draw player
      const { shape, color, x: pos_x, y: pos_y } = playerState;
      shape.forEach((row, y) =>
        row.forEach((col, x) => {
          if (col !== 0) {
            drawSquare(color, pos_x + x, pos_y + y, ctx!);
          }
        })
      );
    };

    }, [stageState, playerState]);
  
  
  return <canvas ref={canvasRef} className={className} />;
};

export default Stage;
