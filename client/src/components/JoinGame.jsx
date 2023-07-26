import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "../utils/CustomInput";

const JoinGame = () => {
  const [player2UserName, setPlayer2UserName] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({
      name: { $eq: player2UserName },
    });

    if (response.users.length === 0) {
      alert("Sorry, we can't find username of other player.");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    // Whant to listen from this channel.
    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput} setChannel={setChannel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            type="text"
            placeholder="username of other player"
            name=""
            id=""
            onChange={(e) => {
              setPlayer2UserName(e.target.value);
            }}
          />
          <button onClick={createChannel}>Start the Game</button>
        </div>
      )}
    </>
  );
};

export default JoinGame;
