import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../../utils/Constants";

const CardColumn = ({
  free,
  foundation,
  tableau,
  colorType,
  poolType,
  columnIdx,
  handleMoveCard,
  children,
}) => {
  //eslint-disable-next-line
  const [{}, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      const { fromPoolType, fromColumn, cardIdx, cards } = item;
      const toPoolType = poolType;
      const toColumn = columnIdx;
      const itemCards = item.cards.slice().splice(cardIdx, cards.length);
      handleMoveCard(
        itemCards,
        fromPoolType,
        fromColumn,
        toPoolType,
        toColumn,
        cardIdx
      );
    },
    canDrop: (item) => {
      const { cardType, cardNum, cardIdx, cards } = item;
      const itemCards = cards.slice().splice(cardIdx, cards.length);

      //color judgement
      const cardColor = (cardType) => {
        if (cardType === "spade" || cardType === "club") {
          return "black";
        } else {
          return "red";
        }
      };

      //判斷卡片群組是否為可拖曳序列
      const reduceData = itemCards.reduce((prevItem, curItem, idx, array) => {
        const prevItemType = cardColor(prevItem.cardType);
        const curItemType = cardColor(curItem.cardType);
        const prevItemNum = prevItem.cardNum;
        const curItemNum = curItem.cardNum;
        if (prevItemType !== curItemType && prevItemNum === curItemNum + 1) {
          return array;
        } else {
          return false;
        }
      });

      if (reduceData) {
        //rule
        switch (poolType) {
          //freeCard
          case "free":
            if (free[columnIdx].length === 0 && itemCards.length === 1) {
              return true;
            } else {
              return false;
            }
          //foundationCard
          case "foundation":
            const foundationTarget = foundation[columnIdx];
            if (cardType === colorType && itemCards.length === 1) {
              if (foundationTarget.length === 0 && cardNum === 1) {
                return true;
              } else {
                if (
                  foundationTarget[foundationTarget.length - 1].cardNum ===
                  cardNum - 1
                ) {
                  return true;
                } else {
                  return false;
                }
              }
            } else {
              return false;
            }
          //tableauCard
          case "tableau":
            const tableauTarget = tableau[columnIdx];
            const lastTargetCard = tableauTarget[tableauTarget.length - 1];
            if (tableauTarget.length === 0) {
              return true;
            } else {
              if (
                cardColor(lastTargetCard.cardType) !== cardColor(cardType) &&
                lastTargetCard.cardNum === cardNum + 1
              ) {
                return true;
              } else {
                return false;
              }
            }
          default:
            return false;
        }
      } else {
        return false;
      }
    },
  });

  return <li ref={dropRef}>{children}</li>;
};

export default CardColumn;
