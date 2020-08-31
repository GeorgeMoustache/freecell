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

const Card = props => {
  const { cardType, cardNum } = props
  //eslint-disable-next-line
  const [{}, dragRef, preview] = useDrag({
    item: { type: ItemTypes.CARD, ...props }
  })

  useEffect(()=> {
    //使用HTML5-backend 中的 getEmptyImage 去設定預設拖曳樣式
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview])

  return (
    <StyleCard ref={dragRef} src={require(`../../assets/images/${cardType}_${cardNum}.png`)} alt={`${cardType}${cardNum}`} />
  )
}

export default Card