import React from "react";
import styled from "styled-components";
//components
import FreePool from './FreePool'
import FoundationPool from './FoundationPool'
import TableauPool from './TableauPool'

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
    pointer-events: none;
  }
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
`;

const Pool = ({ cards: { tableau, free, foundation }, handleMoveCard }) => {
  return (
    <StylePool>
      <div className="top">
        <FreePool free={free} foundation={foundation} handleMoveCard={handleMoveCard} />
        <FoundationPool foundation={foundation} handleMoveCard={handleMoveCard} />
      </div>
      <TableauPool free={free} foundation={foundation} tableau={tableau} handleMoveCard={handleMoveCard} />
    </StylePool>
  );
};

export default Pool;
