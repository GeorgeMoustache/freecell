import React from "react";
import { useDragLayer } from "react-dnd";
import styled from "styled-components";
import ItemTypes from "../../utils/Constants";
import Card from "../Card/";

const StyleGroupCard = styled.div`
  img {
    display: block;
    width: 100px;
    height: auto;
    margin-top: -110px;
    &:first-child {
      margin-top: 0;
    }
  }
`;

//拖曳顯示樣式
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
};

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const renderItem = () => {
    switch (itemType) {
      case ItemTypes.CARD:
        let copyCards = item.cards.slice();
        let itemCards = copyCards.splice(item.cardIdx);
        return (
          <StyleGroupCard>
            {itemCards.map(newItem => {
              return (
                <Card cardType={newItem.cardType} cardNum={newItem.cardNum} key={newItem.cardType + newItem.cardNum} />
              );
            })}
          </StyleGroupCard>
        );
      default:
        return null;
    }
  };

  if (!isDragging) return null;
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};

export default CustomDragLayer;
