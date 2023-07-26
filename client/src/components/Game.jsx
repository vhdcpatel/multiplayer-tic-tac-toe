import React, { useState } from 'react'
import TicTacToeBoard from './TicTacToeBoard';
import { Window, MessageList, MessageInput } from 'stream-chat-react';

import "./ChatSection.css";

const Game = ({ channel, setChannel }) => {
  // Store boolean
  const [playersJoinState, setPlayerJoinState] = useState(
    channel.state.watcher_count === 2
  );

  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (e) => {
    setPlayerJoinState(e.watcher_count === 2);
  });

  if (!playersJoinState) {
    return <h3>Waiting for other player to join.</h3>;
  }

  return (
    <div className="gameContainer">
      <TicTacToeBoard result={result} setResult={setResult} />
      <Window>
        <MessageList
          hideDeletedMessages
          disableDateSeparator
          closeReactionSelectorOnClick
          messageActions={["react"]}
        />
        <MessageInput />
      </Window>
      <button
        className="leave-btn"
        onClick={async () => {       
          await channel.stopWatching();
          setChannel(null);
        }}
      > Leave Game
      </button>
    </div>
  );
};

export default Game