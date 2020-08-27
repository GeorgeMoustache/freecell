import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../../utils/Constants";

const CardColumn = ({ freeCard, finishCard, defaultCard, poolType, columnIdx, handleMoveCard, children }) => {
  //eslint-disable-next-line
  const [{}, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    drop: item => {
      const { fromPoolType, fromColumn } = item;
      const toPoolType = poolType;
      const toColumn = columnIdx;
      console.log("item", item);
      console.log("fromPoolType", fromPoolType);
      console.log("fromColumn", fromColumn);
      console.log("toColumn", toColumn);
      console.log("toPoolType", toPoolType);
      handleMoveCard(item, fromPoolType, fromColumn, toPoolType, toColumn);
    },
    canDrop: item => {
      //color judgement
      const cardColor = (cardType) => {
        if (cardType === 'spade' || cardType === 'club') {
          return 'black'
        } else {
          return 'red'
        }
      }

      //rule
      switch (poolType) {
        //freeCard
        case 'free':
          if (!freeCard[columnIdx].cardNum) {
            return true
          } else {
            return false
          }
        //finishCard
        case 'finish':
          const finishTarget = finishCard[columnIdx];
          const targetType = finishTarget.type;
          const targetCards = finishTarget.cards;
          if (targetType === item.cardType) {
            if (targetCards.length === 0 && item.cardNum === 1) {
              return true
            } else {
              if (targetCards[targetCards.length - 1].cardNum === item.cardNum - 1) {
                return true
              } else {
                return false
              }
            }
          } else {
            return false
          }
        //defaultCard
        case 'default':
          const defaultTarget = defaultCard[columnIdx];
          const lastTargetCard = defaultTarget[defaultTarget.length - 1];
          if (defaultTarget.length === 0) {
            return true
          } else {
            if (cardColor(lastTargetCard.cardType) !== cardColor(item.cardType) && lastTargetCard.cardNum === item.cardNum + 1) {
              return true
            } else {
              return false
            }
          }
        default:
          return false
      }
    }
  });
  return <li ref={dropRef}>{children}</li>;
};

export default CardColumn;
