import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./App.css";
import { StreamChat } from "stream-chat";
import {Chat} from 'stream-chat-react';
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  // const apiSecretKey = import.meta.env.VITE_API_SECRET;
  const [isAuth, setIsAuth] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(apiKey);

  const logOutHandler = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("userName");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("userName"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  // Todos: Set different id for username and password in login and signUp

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button className="logout-Btn" onClick={logOutHandler}>
            Log Out
          </button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <div className="vertical-line"></div>
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
