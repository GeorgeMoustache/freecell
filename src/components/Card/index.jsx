import React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
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
  const [{}, dragRef] = useDrag({
    item: { type: ItemTypes.CARD, ...props }
  })
  return (
    <StyleCard ref={dragRef} src={require(`../../assets/images/${cardType}_${cardNum}.png`)} alt={`${cardType}${cardNum}`} />
  )
}

export default Card