import  { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";


// eslint-disable-next-line react/prop-types
const Login = ({ setIsAuth }) => {
  const cookies = new Cookies();

  const defaultState = {
    userName: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] = useState(defaultState);

  const submitHandlerLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3030/login", loginDetails).then((res) => {
      const { token, userId, firstName, lastName, userName, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("userName", userName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
    setLoginDetails(defaultState);
  };

  return (
    <div className="signUp">
      <label className='label'>Log In</label>
      <form onSubmit={submitHandlerLogin}>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          value={loginDetails.userName}
          onChange={(e) => {
            setLoginDetails((prevState) => ({
              ...prevState,
              userName: e.target.value,
            }));
          }}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={loginDetails.password}
          onChange={(e) => {
            setLoginDetails((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login