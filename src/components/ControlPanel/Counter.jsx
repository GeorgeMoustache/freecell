import React from "react";
import styled from "styled-components";
import moment from 'moment'

const StyleCounter = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    font-size: 24px;
    color: #00000033;
    font-weight: bold;
    span {
      width: 100px;
      color: #fff;
    }
  }
`;

const Counter = ({ gameId, time, moves }) => {
  return (
    <StyleCounter>
      <li>
        <span>ROUND</span>
        {gameId}
      </li>
      <li>
        <span>TIME</span>
        {moment(time).format("mm:ss")}
      </li>
      <li>
        <span>MOVES</span>
        {moves}
      </li>
    </StyleCounter>
  );
};

export default Counter;
