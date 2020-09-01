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

const FreePool = ({ free, foundation, handleMoveCard }) => {
  return (
    <StyleFreePool>
      {free.map((item, idx) => {
        return (
          <CardColumn
            free={free}
            poolType={"free"}
            columnIdx={idx}
            handleMoveCard={handleMoveCard}
            key={idx}
          >
            {item.map((childItem, childIdx) => {
              return (
                <Card
                  free={free}
                  foundation={foundation}
                  cards={item}
                  cardType={childItem.cardType}
                  cardNum={childItem.cardNum}
                  fromPoolType={"free"}
                  fromColumn={idx}
                  cardIdx={childIdx}
                  handleMoveCard={handleMoveCard}
                  key={childItem.cardType + childItem.cardNum}
                />
              );
            })}
          </CardColumn>
        );
      })}
    </StyleFreePool>
  );
};

export default FreePool;
