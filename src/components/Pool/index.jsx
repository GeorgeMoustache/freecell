import React from "react";
import styled from "styled-components";
//components
import FreePool from './FreePool'
import FinishPool from './FinishPool'
import DefaultPool from './DefaultPool'

const StylePool = styled.div`
  position: relative;
  width: 1100px;
  &::before {
    content: "FREECELL";
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 100px;
    color: #00000033;
    font-weight: bold;
  }
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
`;

const Pool = ({ freeCard, finishCard, defaultCard, handleMoveCard }) => {
  return (
    <StylePool>
      <div className="top">
        <FreePool freeCard={freeCard} handleMoveCard={handleMoveCard} />
        <FinishPool finishCard={finishCard} handleMoveCard={handleMoveCard} />
      </div>
      <DefaultPool defaultCard={defaultCard} handleMoveCard={handleMoveCard} />
    </StylePool>
  );
};

export default Pool;
