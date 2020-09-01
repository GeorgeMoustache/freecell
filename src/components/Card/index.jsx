import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from "react-dnd-html5-backend";
import ItemTypes from '../../utils/Constants'

const StyleCard = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
`

const Card = (props) => {
  const { cardType, cardNum, cardIdx, cards, fromPoolType, fromColumn, free, foundation, handleMoveCard } = props
  //eslint-disable-next-line
  const [{}, dragRef, preview] = useDrag({
    item: { type: ItemTypes.CARD, ...props }
  })

  const autoMove = () => {
    if (fromPoolType === 'foundation') return
    let itemCards = null;
    if (fromPoolType === 'tableau') {
      itemCards = cards.slice().splice(cardIdx);
    } else {
      itemCards = cards.slice()
    }

    if (itemCards.length !== 1) return

    const type = ['spade', 'heart', 'diamond', 'club'];
    let toPoolType, toColumn;
    
    const setFoundation = (idx) => {
      toPoolType = 'foundation';
      toColumn = idx;
    }

    //foundation 區
    foundation.forEach((item, idx) => {
      if (item.length !== 0) {
        const lastItem = item[item.length - 1];
        if (lastItem.cardType === cardType && lastItem.cardNum === cardNum - 1) {
          setFoundation(idx);
        }
      }
      
      if (type[idx] === cardType && cardNum === 1) {
        setFoundation(idx);
      }
    })

    // free 區
    free.forEach((item, idx) => {
      if (!toPoolType && item.length === 0) {
        toPoolType = 'free';
        toColumn = idx;
      }
    })

    if (!toPoolType && !toColumn) return
    handleMoveCard(itemCards, fromPoolType, fromColumn, toPoolType, toColumn, cardIdx);
  }

  useEffect(()=> {
    //使用HTML5-backend 中的 getEmptyImage 去設定預設拖曳樣式
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview])

  return (
    <StyleCard ref={dragRef} src={require(`../../assets/images/${cardType}_${cardNum}.png`)} alt={`${cardType}${cardNum}`} onDoubleClick={autoMove} />
  )
}

export default Card