import React from 'react'
import styled from 'styled-components'

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
    width: 1700px;
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
            &::before {
              content: '';
              display: block;
              width: 22px;
              height: 22px;
              margin-right: 10px;
              background: #FFF;
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
      width: 1400px;
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
          width: 620px;
          li {
            width: 130px;
            height: 200px;
            border: 3px solid #70707072;
            box-shadow: 2px -1px 5px #00000026;
          }
        }
        .free-space {
          
          
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between
      }
    }
  }
`

const stage = () => {

  //控制按鈕
  const control = () => {
    return (
      <ul className='control'>
        <li>
          <button>redo</button>
        </li>
        <li>
          <button>new game</button> 
        </li>
        <li>
          <button>pause</button>
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
          <span>TIME</span>1,520
        </li>
        <li>
          <span>MOVES</span>132
        </li>
      </ul>
    )
  }

  return (
    <StageContainer>
      <div className='wrap'>
        <div className='left'>
          {control()}
          {counter()}
        </div>
        <div className='right'>
          <div className='top'>
            <ul className='free-space'>
              <li>fs-1</li>
              <li>fs-2</li>
              <li>fs-3</li>
              <li>fs-4</li>
            </ul>
            <ul className='current-space'>
              <li>cs-1</li>
              <li>cs-2</li>
              <li>cs-3</li>
              <li>cs-4</li>
            </ul>
          </div>
          <ul className='bottom'>
            <li>row-1</li>
            <li>row-2</li>
            <li>row-3</li>
            <li>row-4</li>
            <li>row-5</li>
            <li>row-6</li>
            <li>row-7</li>
            <li>row-8</li>
          </ul>
        </div>
      </div>
    </StageContainer>
  )
}

export default stage