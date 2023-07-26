import  { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';


// eslint-disable-next-line react/prop-types
const SignUp = ({ setIsAuth }) => {
  const defaultState = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  };

  const cookies = new Cookies();
  const [user, setUser] = useState(defaultState);

  const submitHandlerSignUp = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3030/signup", user).then((res) => {
      console.log(res);
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
    setUser(defaultState);
  };

  return (
    <div className="signUp">
      <label>Sign Up</label>
      <form onSubmit={submitHandlerSignUp}>
        <input
          type="text"
          id="firstName"
          value={user.firstName}
          placeholder="First Name"
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              firstName: e.target.value,
            }));
          }}
        />
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={user.lastName}
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              lastName: e.target.value,
            }));
          }}
        />
        <input
          type="text"
          id="userName"
          placeholder="Username"
          value={user.userName}
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              userName: e.target.value,
            }));
          }}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => {
            setUser((prevState) => ({
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

export default SignUp