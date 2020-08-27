import React from "react";
import styled from "styled-components";
//components
import CardColumn from "../Column";
import Card from "../Card/";

const StyleFreePool = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 48%;
  li {
    display: flex;
    align-items: center;
    width: 100px;
    height: 145px;
    border: 3px solid #70707072;
    box-shadow: 2px -1px 5px #00000026;
  }
`;

const FreePool = ({ freeCard, handleMoveCard }) => {
  return (
    <StyleFreePool>
      {freeCard.map((item, idx) => {
        return (
          <CardColumn
            freeCard={freeCard}
            poolType={"free"}
            columnIdx={idx}
            handleMoveCard={handleMoveCard}
            key={idx}
          >
            {item.type === "card" ? (
              <Card
                cardType={item.cardType}
                cardNum={item.cardNum}
                fromPoolType={"free"}
                fromColumn={idx}
                key={item.cardType + item.cardNum}
              />
            ) : null}
          </CardColumn>
        );
      })}
    </StyleFreePool>
  );
};

export default FreePool;
