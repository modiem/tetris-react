import React from 'react';
import Form from '../UI/Form';
import Modal from '../UI/Modal';

const GameOverPage: React.FC<{
  score: number;
  reStart: (event: React.MouseEvent) => void;
  closeModal: (event: React.MouseEvent) => void;
}> = (props) => {
  const scoreSaved=true;
  return (
    <Modal onClose={props.closeModal}>
      <h1>Game Over!</h1>
      <h1>{props.score}</h1>
      <p>
        You got a highscore! Enter Name:
      </p>
      {!scoreSaved && <Form />}
      {scoreSaved && <button onClick={props.reStart}>Restart</button>}
    </Modal>
  );
};

export default GameOverPage;