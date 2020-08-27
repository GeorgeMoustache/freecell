import React from "react";
import styled from "styled-components";
//assets
import welcome from '../../assets/images/welcome.jpg'

const StyleDialog = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .wrap {
    width: 700px;
    padding: 60px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 3px 10px #00000065;
    box-sizing: border-box;
    .title {
      margin-bottom: 40px;
      font-size: 100px;
      color: #88a38a;
      font-weight: bold;
      text-align: center;
    }
    img {
      display: block;
      margin: 0 auto 40px auto;
    }
    button {
      display: block;
      width: 480px;
      margin: 20px auto 0 auto;
      padding: 0 20px;
      background: none;
      border: 4px solid #00000033;
      border-radius: 38px;
      font-size: 20px;
      color: #00000033;
      line-height: 50px;
      font-weight: bold;
      &:hover {
        background: #00000033;
        color: #fff;
      }
    }
  }
`;

const Dialog = ({ enabled, gameStatus, gameId, handleNewGame, handleResume }) => {

  //重開新局
  const restart = () => {
    let id = gameId;
    handleNewGame(id)
  }

  const panel = () => {
    switch (gameStatus) {
      //新局
      case 0:
        return (
          <>
            <div className="title">FREECELL</div>
            <img src={welcome} alt='win!!!' />
            <button onClick={handleNewGame}>QUICK and START A NEW GAME</button>
          </>
        );
      //暫停
      case 1:
        return (
          <>
            <div className="title">FREECELL</div>
            <button onClick={handleNewGame}>QUICK and START A NEW GAME</button>
            <button onClick={restart}>RESTART THIS GAME</button>
            <button onClick={handleResume}>KEEP PLAYING</button>
          </>
        );
      //贏了
      case 2:
        return (
          <>
            <div className="title">WIN!</div>
            <img src={welcome} alt='win!!!' />
            <button onClick={handleNewGame}>QUICK and START A NEW GAME</button>
          </>
        );
      default:
        return <></>
    }
  };

  if (enabled) {
    return (
      <StyleDialog>
        <div className="wrap">{panel()}</div>
      </StyleDialog>
    );
  } else {
    return null;
  }
};

export default Dialog;
