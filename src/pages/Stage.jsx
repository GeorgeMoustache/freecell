import React, { useState } from "react";
import styled from "styled-components";
//components
import ControlPanel from "../components/ControlPanel";
import Pool from "../components/Pool";
import Dialog from "../components/Dialog";
//data
import PLAYING_CARDS from "../utils/playingCards";

const StyleStage = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 100px;
  background: #c8d6c9;
  > .wrap {
    display: flex;
    justify-content: space-between;
    width: 1400px;
  }
`;

//卡片種類
// const type = ["spade", "heart", "diamond", "club"];

const Stage = () => {
  const [gameStatus, setGameStatus] = useState(0); //遊戲狀態 0:新局; 1:暫停; 2:遊戲結束
  const [gameId, setGameId] = useState(0); //局號
  const [counter, setCounter] = useState(); //計時器
  const [time, setTime] = useState(0); //秒數
  const [moves, setMoves] = useState(0); //移動次數
  //初始牌組卡片
  const [defaultCard, setDefaultCard] = useState([]);
  //自由牌組區卡片
  const [freeCard, setFreeCard] = useState([{}, {}, {}, {}]);
  //完成牌組區卡片
  const [finishCard, setFinishCard] = useState([
    { type: "spade", cards: [] },
    { type: "heart", cards: [] },
    { type: "diamond", cards: [] },
    { type: "club", cards: [] },
  ]);
  const [dialogEnabled, setDialogEnabled] = useState(true);

  //計時函數
  const timeCounter = (time) => {
    let countTime = time || 0;
    let interval = setInterval(() => {
      countTime += 1000;
      setTime(countTime);
    }, 1000);
    setCounter(interval);
  };

  //新遊戲
  const handleNewGame = () => {
    setDialogEnabled(false);

    //重新計時
    clearInterval(counter);
    setTime(0);
    timeCounter();

    //重置次數
    setMoves(0);

    //牌堆重置
    setFreeCard([{}, {}, {}, {}]);
    setFinishCard([
      { type: "spade", cards: [] },
      { type: "heart", cards: [] },
      { type: "diamond", cards: [] },
      { type: "club", cards: [] },
    ]);
    shuffle()
  };

  //暫停遊戲
  const handlePauseGame = () => {
    setDialogEnabled(true);
    setGameStatus(1);
    clearInterval(counter);
  };

  //繼續遊戲
  const handleResume = () => {
    setDialogEnabled(false);
    timeCounter(time);
  };

  //洗牌
  const shuffle = (id) => {
    const cards = [];
    const deck = [...PLAYING_CARDS];

    let seed;
    console.log('shuffleId', id)
    if (id) {
      seed = id;
    } else {
      seed = Math.floor(Math.random() * 1000000);
    }
    setGameId(seed)

    for (let len = 52; len >= 2; len--) {
      if (cards.length) return;
      seed = (214013 * seed + 2531011) & 0x7fffffff;
      let index = (seed >> 16) % len;
      [deck[index], deck[len - 1]] = [deck[len - 1], deck[index]];
    }

    let newDeck = [[], [], [], [], [], [], [], []];

    deck.forEach((item, idx) => {
      newDeck.forEach((newItem, newIdx) => {
        let fixItem = {};
        fixItem.cardType = item.split("-")[0];
        fixItem.cardNum = Number(item.split("-")[1]);
        if (idx % 8 === newIdx) newItem.push(fixItem);
      });
    });

    setDefaultCard(newDeck);
  };

  //拖曳移動卡牌
  const handleMoveCard = (
    item,
    fromPoolType,
    fromColumn,
    toPoolType,
    toColumn
  ) => {
    //remove card
    switch (fromPoolType) {
      case "free":
        freeCard[fromColumn] = {};
        break;
      case "finish":
        finishCard[fromColumn].cards.splice(item.cardIdx, 1);
        break;
      default:
        defaultCard[fromColumn].splice(item.cardIdx, 1);
    }

    //add card
    let newCard = null;
    switch (toPoolType) {
      case "free":
        newCard = [...freeCard];
        newCard[toColumn] = item;
        setFreeCard(newCard);
        break;
      case "finish":
        newCard = [...finishCard];
        newCard[toColumn].cards.push(item);
        setFinishCard(newCard);
        break;
      default:
        newCard = [...defaultCard];
        newCard[toColumn].push(item);
        setDefaultCard(newCard);
    }

    setMoves(moves + 1);
  };

  return (
    <StyleStage>
      <div className="wrap">
        <ControlPanel
          gameId={gameId}
          time={time}
          moves={moves}
          handleNewGame={handleNewGame}
          handlePauseGame={handlePauseGame}
        />
        <Pool
          freeCard={freeCard}
          finishCard={finishCard}
          defaultCard={defaultCard}
          handleMoveCard={handleMoveCard}
        />
      </div>
      <Dialog
        enabled={dialogEnabled}
        gameStatus={gameStatus}
        gameId={gameId}
        handleNewGame={handleNewGame}
        handleResume={handleResume}
      />
    </StyleStage>
  );
};

export default Stage;
