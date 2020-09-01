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

const initState = {
  id: 0, //局號
  status: 0, //遊戲狀態 0:新局; 1:暫停; 2:遊戲結束
  moves: 0, //移動次數
  //卡片兒
  cards: {
    tableau: [],
    free: [[], [], [], []],
    foundation: [[], [], [], []],
  },
  history: [], //歷史記錄
  dialogEnabled: true, //dialog 開關
};

const Stage = () => {
  const [game, setGame] = useState(initState);
  const [counter, setCounter] = useState(null); //計時器
  const [time, setTime] = useState(0); //秒數

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
    setTime(0);
    clearInterval(counter);
    timeCounter();
    shuffle();
  };

  //暫停遊戲
  const handlePauseGame = () => {
    setGame({ ...game, status: 1, dialogEnabled: true });
    clearInterval(counter);
  };

  //繼續遊戲
  const handleResume = () => {
    setGame({ ...game, dialogEnabled: false });
    timeCounter(time);
  };

  //還原上一步
  const handleRedo = () => {
    game.history.pop();
    let newCards = game.history[game.history.length - 1];
    setGame({ ...game, moves: game.moves + 1, cards: newCards });
  };

  //洗牌
  const shuffle = () => {
    const cards = [];
    const deck = [...PLAYING_CARDS];

    let seed = Math.floor(Math.random() * 1000000);
    let id = seed;

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

    game.history.splice(0);
    const newHistory = { ...game.cards, tableau: newDeck };
    game.history.push(newHistory);
    setGame({
      ...initState,
      id: id,
      cards: { ...initState.cards, tableau: newDeck },
      dialogEnabled: false,
    });
  };

  //拖曳移動卡牌
  const handleMoveCard = ( itemCards, fromPoolType, fromColumn, toPoolType, toColumn, cardIdx ) => {
    const jsonGameData = JSON.stringify(game);
    const newGameData = JSON.parse(jsonGameData);
    //removeCard
    newGameData.cards[fromPoolType][fromColumn].splice(cardIdx);
    //addCard
    let copyData = newGameData.cards[toPoolType].slice();
    let newToData = copyData[toColumn].concat(itemCards);
    newGameData.cards[toPoolType][toColumn] = newToData;
    //addHistory
    newGameData.history.push(newGameData.cards);

    const finish = newGameData.cards.foundation.every(item => item.length === 13);
    if (finish) {
      setGame({ ...newGameData, status: 2, moves: newGameData.moves + 1, dialogEnabled: true });  
      clearInterval(counter)
    } else {
      setGame({ ...newGameData, moves: newGameData.moves + 1});  
    }
  };

  return (
    <StyleStage>
      <div className="wrap">
        <ControlPanel
          gameId={game.id}
          time={time}
          moves={game.moves}
          history={game.history}
          handleNewGame={handleNewGame}
          handlePauseGame={handlePauseGame}
          handleRedo={handleRedo}
        />
        <Pool cards={game.cards} handleMoveCard={handleMoveCard} />
      </div>
      <Dialog
        enabled={game.dialogEnabled}
        status={game.status}
        handleNewGame={handleNewGame}
        handleResume={handleResume}
      />
    </StyleStage>
  );
};

export default Stage;
