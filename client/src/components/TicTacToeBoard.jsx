import React, { useState, useEffect } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";
import { Patterns } from "../utils/WinningPatterns";

const TicTacToeBoard = ({ result, setResult }) => {
  const [boardState, setBoardState] = useState(Array(9).fill(""));

  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    const handleGameMove = (event) => {
      // console.log(turn);
      // console.log(player);

      if (event.type === "game-move" && event.user.id !== client.userId) {
        const currentPlayer = event.data.player === "X" ? "O" : "X";
        setPlayer(currentPlayer);
        setTurn(currentPlayer);

        // console.log(turn);
        // console.log(player);

        setBoardState(
          boardState.map((val, idx) => {
            if (idx === event.data.square && val === "") {
              return event.data.player;
            }
            return val;
          })
        );
      }
    };

    // Check for state of the game after every user move.
    checkTie();

    checkWin();
    
    channel.on(handleGameMove);

    return () => {
      channel.off(handleGameMove);
    };
  }, [channel, client.userId, boardState]);

  const chooseSquare = async (square) => {
    if (turn === player && boardState[square] === "") {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });

      setBoardState(
        boardState.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = boardState[currPattern[0]];
      if (firstPlayer == "") return;

      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (boardState[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        alert("Wineer", firstPlayer);
        console.log("Winner is ", boardState[currPattern[0]]);

        setResult({ winner: boardState[currPattern[0]], state: "Won" });
        setBoardState(Array(9).fill(""));
      }
    });
  };

  const checkTie = () => {
    let filled = true;
    boardState.forEach((sqare) => {
      if (sqare === "") {
        filled = false;
      }
    });
    if (filled) {
      alert("Nice Try both of you, Tie Game");
      setResult({ winner: "none", state: "tie" });
      setBoardState(Array(9).fill(""));
    }
  };

  return (
    <div className="board">
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(0);
          }}
          currentVal={boardState[0]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(1);
          }}
          currentVal={boardState[1]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(2);
          }}
          currentVal={boardState[2]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(3);
          }}
          currentVal={boardState[3]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(4);
          }}
          currentVal={boardState[4]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(5);
          }}
          currentVal={boardState[5]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(6);
          }}
          currentVal={boardState[6]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(7);
          }}
          currentVal={boardState[7]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(8);
          }}
          currentVal={boardState[8]}
        />
      </div>
    </div>
  );
};
export default TicTacToeBoard;
