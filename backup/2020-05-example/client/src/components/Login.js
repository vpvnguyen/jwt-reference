import React from "react";

const Login = ({ setAuth }) => {
  return (
    <React.Fragment>
      <h1>Login</h1>
      <button onClick={() => setAuth(true)}>Authenticate</button>
    </React.Fragment>
  );
};

export default Login;
