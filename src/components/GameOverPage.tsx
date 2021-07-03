import React from 'react';
import Form from './UI/Form';
import Modal from './UI/Modal';

const GameOverPage: React.FC<{
  score: number;
  reStart: (event: React.MouseEvent) => void;
  closeModal: (event: React.MouseEvent) => void;
}> = (props) => {
  return (
    <Modal onClose={props.closeModal}>
      <h1>Game Over!</h1>
      <h2>score: {props.score}</h2>

      <button onClick={props.reStart}>Restart</button>
    </Modal>
  );
};

export default GameOverPage;