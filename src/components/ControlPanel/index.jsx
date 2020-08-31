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

const ControlPanel = ({ gameId, time, moves, history, handleNewGame, handlePauseGame, handleRedo }) => {
  return (
    <StyleControlPanel>
      <Control history={history} handleNewGame={handleNewGame} handlePauseGame={handlePauseGame} handleRedo={handleRedo} />
      <Counter gameId={gameId} time={time} moves={moves} />
    </StyleControlPanel>
  );
};

export default ControlPanel;
