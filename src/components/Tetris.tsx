import {useState} from 'react';

import Stage from "./Stage";
import classes from "./Tetris.module.css";
import Display from "./UI/Display";
import { POINTS } from "../utils/constants";

//import hooks
import useStage from "../hooks/useStage";
import usePlayer from "../hooks/usePlayer";
import useGame from "../hooks/useGame";
import React, { Fragment, useEffect } from "react";
import Next from "./Next";
import GameOverPage from "./GameOverPage";

const Tetris = () => {
  const [openModal, setOpenModal] = useState(false)
  const [stageState, renewStage, clearStage] = useStage();
  const [gameState, dispatchGame] = useGame();
  const [playerState, dispatchPlayer] = usePlayer(stageState, gameState);

  //check GameOver
  const isGameOver = stageState[0].some(element=>element !== 0)
  useEffect(()=>{
    if (isGameOver) {
      dispatchGame({type: 'SetGameOver'})
      setOpenModal(true);
    }
  },[dispatchGame, isGameOver])
  
  useEffect(() => {
    if (!isGameOver && playerState.isCollided) {

      //update stage && update line
      const clearedRows = renewStage(playerState);
      dispatchGame({ type: "AddLines", payload: clearedRows });

      //update score: 1. drop score
      dispatchGame({
        type: "ChangeScore",
        payload: POINTS[playerState.dropType],
      });

      //update score: 2. clear line score
      let addScore = POINTS.NONE;
      if (clearedRows > 3) {
        addScore = POINTS.TETRIS;
        if (gameState.level > 6) {
          dispatchGame({ type: "ChangeLevel", payload: -3 });
        }
      } else if (clearedRows > 2) {
        addScore = POINTS.TRIPLE;
        if (gameState.level > 6) {
          dispatchGame({ type: "ChangeLevel", payload: -2 });
        }
      } else if (clearedRows > 1) {
        addScore = POINTS.DOUBLE;
      } else if (clearedRows > 0) {
        addScore = POINTS.SINGLE;
        if (gameState.level>7) {
          dispatchGame({ type: "ChangeLevel", payload: -1 });
        }
      }
      dispatchGame({ type: "ChangeScore", payload: addScore });

      //change piece
      dispatchPlayer({ type: "Reset" });
    }
  }, [isGameOver,playerState.isCollided]);

  const startGameHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    closeModalHandler(event);
    if (gameState.isGameOver) {
      dispatchGame({ type: "ResetGame" });
      clearStage();
      dispatchPlayer({ type: "Reset" });
    } else {
      dispatchGame({ type: "TogglePause" });
    }
  };

  const movePlayerHandler = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (!playerState.isCollided) {
      dispatchPlayer({ type: event.code, payload: stageState });
    }
  };

  const closeModalHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenModal(false)
  }


  return (
    <Fragment>
      {openModal && 
        <GameOverPage 
        score={gameState.score} reStart={startGameHandler} 
        closeModal={closeModalHandler}
        />
      }
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
              <Display title="Score" value={gameState.score} />
              <Display title="Lines" value={gameState.lines} />
              <Display title="Level" value={gameState.level} />
              <Display title="Next" value={null} />
              <Next playerState={playerState} gameState={gameState} />
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
    </Fragment>
  );
};

export default Tetris;
