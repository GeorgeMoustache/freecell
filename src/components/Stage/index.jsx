import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//components
import Card from '../Card/'
//assets
import symbloSpade from '../../assets/images/card/symblo-spade.png'
import symbloHeart from '../../assets/images/card/symblo-heart.png'
import symbloDiamond from '../../assets/images/card/symblo-diamond.png'
import symbloClub from '../../assets/images/card/symblo-club.png'
//data
import PLAYING_CARDS from '../../utils/playingCards'

const StageContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 100px;
  background: #C8D6C9;
  .wrap {
    display: flex;
    justify-content: space-between;
    width: 1400px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 200px;
      .control {
        li {
          margin-bottom: 24px;
          &:last-child {
            margin-bottom: 0;
          }
          button {
            display: inline-flex;
            align-items: center;
            padding: 10px 20px;
            background: none;
            border: 4px solid #FFF;
            border-radius: 38px;
            font-size: 18px;
            color: #FFF;
            letter-spacing: 1px;
            font-weight: bold;
            text-transform: uppercase;
            & svg {
              margin-right: 10px;
            }
          }
        }
      }
      .counter {
        li {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          font-size: 24px;
          color: #00000033;
          font-weight: bold;
          span {
            width: 100px;
            color: #FFF;
          }
        }
        
      }
    }
    .right {
      position: relative;
      width: 1100px;
      &::before {
        content: 'FREECELL';
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 100px;
        color: #00000033;
        font-weight: bold;
      }
      .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        .free-space,
        .current-space {
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
        }
        .current-space li {
          background-position: center center;
          background-repeat: no-repeat;
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
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        li {
          position: relative;
          width: 100px;
          & img {
            display: block;
            width: 100%;
            height: auto;
            margin-top: -110px;
            &:first-child {
              margin: 0;
            }
          }
        }
      }
    }
  }
`

//卡片種類
const type = ['spade', 'heart', 'diamond', 'club'] 

const Stage = () => {
  const [freeCard, setFreeCard] = useState() //自由牌組區卡片
  const [curCard, setCurCard] = useState() //完成牌組區卡片

  const [score, setScore] = useState(0) //分數計算
  const [time, setTime] = useState('00,00,00') //時間計算
  const [move, setmove] = useState(0) //移動總次數

  const [game, setGame] = useState({ id: 617, cards: []})

  //控制按鈕
  const control = () => {
    return (
      <ul className='control'>
        <li>
          <button onClick={()=> console.log(game)}><i className="fa fa-reply-all fa-lg" />redo</button>
        </li>
        <li>
          <button><i className="fa fa-plus fa-lg" />new game</button> 
        </li>
        <li>
          <button><i className="fa fa-pause fa-lg" />pause</button>
        </li>
      </ul>
    )
  }

  //計數區塊
  const counter = () => {
    return (
      <ul className='counter'>
        <li>
          <span>SCORE</span>1,520
        </li>
        <li>
          <span>TIME</span>{time}
        </li>
        <li>
          <span>MOVES</span>{move}
        </li>
      </ul>
    )
  }

  //自由牌區
  const freeCardPool = () =>{
    return (
      <ul className='free-space'>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    )
  }

  //完成牌區
  const currentCardPool = () => {
    return (
      <ul className='current-space'>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    )
  }

  //初始牌區
  const defaultCardPool = () => {
    return (
      <ul className='bottom'>
        {
          game.cards.map((item, idx) => {
            return (
              <li key={idx}>
                {
                  item.map((childItem, childIdx) => {
                    return (
                      <Card cardType={childItem.split('-')[0]} cardNum={childItem.split('-')[1]} key={childIdx} />
                    )
                  })
                }
              </li>
            )
          })
        }
      </ul>
    )
  }

  const shuffle = () => {
    const cards = []
    const deck = [...PLAYING_CARDS]
    let seed = game.id

    for (let len = 52; len >= 2; len--) {
      if (cards.length) return
      seed = ((214013 * seed) + 2531011) & 0x7FFFFFFF;
      let index = (seed >> 16) % len;
      [deck[index], deck[len - 1]] = [deck[len - 1], deck[index]]
    }

    let newDeck = [[], [], [], [], [], [], [], []]
    
    deck.forEach((item, idx) => {
      if (idx === 0 || idx === 8 || idx === 16 || idx === 24 || idx === 32 || idx === 40 || idx === 48) {
        newDeck[0].push(item)
      } else if (idx === 1 || idx === 9 || idx === 17 || idx === 25 || idx === 33 || idx === 41 || idx === 49) {
        newDeck[1].push(item)
      } else if (idx === 2 || idx === 10 || idx === 18 || idx === 26 || idx === 34 || idx === 42 || idx === 50) {
        newDeck[2].push(item)
      } else if (idx === 3 || idx === 11 || idx === 19 || idx === 27 || idx === 35 || idx === 43 || idx === 51) {
        newDeck[3].push(item)
      } else if (idx === 4 || idx === 12 || idx === 20 || idx === 28 || idx === 36 || idx === 44) {
        newDeck[4].push(item)
      } else if (idx === 5 || idx === 13 || idx === 21 || idx === 29 || idx === 37 || idx === 45) {
        newDeck[5].push(item)
      } else if (idx === 6 || idx === 14 || idx === 22 || idx === 30 || idx === 38 || idx === 46) {
        newDeck[6].push(item)
      } else {
        newDeck[7].push(item)
      }
    })
    
    setGame({...game, cards: newDeck})
  }

  useEffect(()=> {
    shuffle()
  },[])

  return (
    <StageContainer>
      <div className='wrap'>
        <div className='left'>
          {control()}
          {counter()}
        </div>
        <div className='right'>
          <div className='top'>
            {freeCardPool()}
            {currentCardPool()}
          </div>
          {defaultCardPool()}
        </div>
      </div>
    </StageContainer>
  )
}

export default Stage