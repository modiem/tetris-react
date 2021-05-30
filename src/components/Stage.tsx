import { useRef, useEffect } from "react";
import data from "../utils/constants";
import { TETRIMINOS } from "../utils/tetriminos";
import type { StageState, Player, GameState } from "../utils/types";
import { drawSquare } from "../utils/functions";

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

    // Scale blockss
    ctx!.scale(BLOCK_SIZE, BLOCK_SIZE);

    //clear State
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    ctx!.beginPath();

    if (!gameState.isGameOver) {
      //draw stage
      stageState.forEach((row, y) =>
        row.forEach((element, x) => {
          if (element !== 0) {
            const color = TETRIMINOS[element].color;
            drawSquare(color, x, y, ctx!);
          }
        })
      );

      //draw player

      const { shape, color, x: pos_x, y: pos_y } = playerState;
      if (stageState[0].every((e) => e === 0)) {
        shape.forEach((row, y) =>
          row.forEach((element, x) => {
            if (
              element !== 0 &&
              pos_y + y >= 0 &&
              stageState[pos_y + y][pos_x + x] === 0
            ) {
              drawSquare(color, pos_x + x, pos_y + y, ctx!);
            }
          })
        );
      }
    }
  }, [stageState, playerState]);

  return <canvas ref={canvasRef} className={className} />;
};

export default Stage;
