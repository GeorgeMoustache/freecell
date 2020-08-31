import React from "react";
import styled from "styled-components";

const StyleControl = styled.ul`
  li {
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
    button {
      display: inline-flex;
      align-items: center;
      padding: 10px 20px;
      background: none;
      border: 4px solid #fff;
      border-radius: 38px;
      font-size: 18px;
      color: #fff;
      letter-spacing: 1px;
      font-weight: bold;
      text-transform: uppercase;
      & svg {
        margin-right: 10px;
      }
    }
  }
`;

const Control = ({ history, handleNewGame, handlePauseGame, handleRedo }) => {
  return (
    <StyleControl>
      <li>
        <button onClick={handleRedo} disabled={history.length <= 1}>
          <i className="fa fa-reply-all fa-lg" />
          redo
        </button>
      </li>
      <li>
        <button onClick={handleNewGame}>
          <i className="fa fa-plus fa-lg" />
          new game
        </button>
      </li>
      <li>
        <button onClick={handlePauseGame}>
          <i className="fa fa-pause fa-lg" />
          pause
        </button>
      </li>
    </StyleControl>
  );
};

export default Control;
