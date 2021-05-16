import React from "react";

const Dashboard = ({ setAuth }) => {
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <button onClick={() => setAuth(false)}>Logout</button>
    </React.Fragment>
  );
};

export default Dashboard;
