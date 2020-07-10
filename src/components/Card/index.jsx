import React from 'react'
import styled from 'styled-components'

const CardComponent = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
`

const card = props => {
  const { cardType, cardNum, animation } = props 
  return (
    <CardComponent src={require(`../../assets/images/card/${cardType}_${cardNum}.png`)} alt={`${cardType}${cardNum}`} />
  )
}

export default card