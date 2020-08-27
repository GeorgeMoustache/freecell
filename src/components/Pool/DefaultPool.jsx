import React from "react";
import styled from "styled-components";
//components
import CardColumn from "../Column";
import Card from "../Card/";

const StyleDefaultPool = styled.ul`
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

const DefaultPool = ({ defaultCard, handleMoveCard }) => {
  return (
    <StyleDefaultPool>
      {defaultCard.map((item, idx) => {
        return (
          <CardColumn
            defaultCard={defaultCard}
            poolType={"default"}
            columnIdx={idx}
            handleMoveCard={handleMoveCard}
            key={idx}
          >
            {item.map((childItem, childIdx) => {
              return (
                <Card
                  cardType={childItem.cardType}
                  cardNum={childItem.cardNum}
                  fromPoolType={"default"}
                  fromColumn={idx}
                  cardIdx={childIdx}
                  key={childItem.cardType + childItem.cardNum}
                />
              );
            })}
          </CardColumn>
        );
      })}
    </StyleDefaultPool>
  );
};

export default DefaultPool;
