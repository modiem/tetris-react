import Stage from "./Stage";
import classes from "./Tetris.module.css";
import Display from "./UI/Display";

//import types and data
import data from "../gameHelper";

//import hooks
import useStage from "../hooks/useStage";
import usePlayer from "../hooks/usePlayer";
import useGame from "../hooks/useGame";
import React, { useEffect } from "react";

const Tetris = () => {
  const [playerState, dispatchPlayer] = usePlayer();
  const [stageState, renewStage, clearStage] = useStage();
  const [gameState, toggleStartGame, togglePause, logScore, incrementLevel] =
    useGame();

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (!gameState.isPause) {
      id = setInterval(
        () => dispatchPlayer({ type: "ArrowDown", payload: stageState }),
        1000
      );
    }
    return () => {
      clearInterval(id);
    };
  }, [playerState, gameState]);

  useEffect(() => {
    //change stage
    // console.table(stageState);
    if (playerState.isCollided) {
      renewStage(playerState);
      dispatchPlayer({ type: "Reset" });
    }
  }, [playerState.isCollided, dispatchPlayer]);

  const startGameHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (gameState.isGameOver) {
      toggleStartGame();
      clearStage();
      dispatchPlayer({ type: "Reset" });
    } else {
      togglePause();
    }
  };

  const movePlayerHandler = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (!playerState.isCollided) {
      dispatchPlayer({ type: event.code, payload: stageState });
    }
  };

  return (
    <div
      className={classes.container}
      onKeyDown={movePlayerHandler}
      tabIndex={0}
    >
      <div className={classes.grid}>
        <Stage
          className={classes.board}
          stageState={stageState}
          playerState={playerState}
          gameState={gameState}
        />
        <aside className={classes.aside}>
          <div>
            <h2>Tetris</h2>
            <Display title="Score" value={0} />
            <Display title="Lines" value={0} />
            <Display title="Level" value={0} />
            <canvas>Next Tetriminoe</canvas>
          </div>

          <button onClick={startGameHandler}>
            {`${
              gameState.isGameOver
                ? "Start Game"
                : gameState.isPause
                ? "Continue"
                : "Pause"
            }`}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
