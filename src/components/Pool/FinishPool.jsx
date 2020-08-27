import React from "react";
import styled from "styled-components";
//components
import CardColumn from "../Column";
import Card from "../Card/";
//assets
import symbloSpade from "../../assets/images/symblo-spade.png";
import symbloHeart from "../../assets/images/symblo-heart.png";
import symbloDiamond from "../../assets/images/symblo-diamond.png";
import symbloClub from "../../assets/images/symblo-club.png";

const StyleFinishPool = styled.div`
  display: flex;
  justify-content: space-between;
  width: 48%;
  li {
    position: relative;
    display: flex;
    align-items: center;
    width: 100px;
    height: 145px;
    background-position: center center;
    background-repeat: no-repeat;
    border: 3px solid #70707072;
    box-shadow: 2px -1px 5px #00000026;
    &:nth-child(1) {
      background-image: url(${symbloSpade});
    }
    &:nth-child(2) {
      background-image: url(${symbloHeart});
    }
    &:nth-child(3) {
      background-image: url(${symbloDiamond});
    }
    &:nth-child(4) {
      background-image: url(${symbloClub});
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const FinishPool = ({ finishCard, handleMoveCard }) => {
  return (
    <StyleFinishPool>
      {finishCard.map((item, idx) => {
        return (
          <CardColumn
            finishCard={finishCard}
            poolType={"finish"}
            columnIdx={idx}
            handleMoveCard={handleMoveCard}
            key={item.id + item.type}
          >
            {item.cards.map((childItem, childIdx) => {
              return (
                <Card
                  cardType={childItem.cardType}
                  cardNum={childItem.cardNum}
                  fromPoolType={"finish"}
                  fromColumn={idx}
                  cardIdx={childIdx}
                  key={childItem.cardType + childItem.cardNum}
                />
              );
            })}
          </CardColumn>
        );
      })}
    </StyleFinishPool>
  );
};

export default FinishPool;
