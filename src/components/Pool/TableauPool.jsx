import React from "react";
import styled from "styled-components";
//components
import CardColumn from "../Column";
import Card from "../Card/";

const StyleTableauPool = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    position: relative;
    width: 100px;
    & img {
      display: block;
      width: 100%;
      height: auto;
      margin-top: -110px;
      &:first-child {
        margin: 0;
      }
    }
  }
`;

const TableauPool = ({ tableau, handleMoveCard }) => {
  return (
    <StyleTableauPool>
      {tableau.map((item, idx) => {
        return (
          <CardColumn
            tableau={tableau}
            poolType={"tableau"}
            columnIdx={idx}
            handleMoveCard={handleMoveCard}
            key={idx}
          >
            {item.map((childItem, childIdx) => {
              return (
                <Card
                  cards={item}
                  cardType={childItem.cardType}
                  cardNum={childItem.cardNum}
                  fromPoolType={"tableau"}
                  fromColumn={idx}
                  cardIdx={childIdx}
                  key={childItem.cardType + childItem.cardNum}
                />
              );
            })}
          </CardColumn>
        );
      })}
    </StyleTableauPool>
  );
};

export default TableauPool;
