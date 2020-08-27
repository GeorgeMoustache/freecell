import React from "react";
import styled from "styled-components";
//components
import Control from "./Control";
import Counter from "./Counter";

const StyleControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
`;

const ControlPanel = ({ gameId, time, moves, handleNewGame, handlePauseGame }) => {
  return (
    <StyleControlPanel>
      <Control handleNewGame={handleNewGame} handlePauseGame={handlePauseGame} />
      <Counter gameId={gameId} time={time} moves={moves} />
    </StyleControlPanel>
  );
};

export default ControlPanel;
