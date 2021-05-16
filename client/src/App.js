import "./App.css";
import axios from "axios";

function App() {
  const authUser = async () => {
    const username = "vpvnguyen";
    const userJwt = await axios.post("http://localhost:3001/createNewUser", {
      username,
    });
    console.log("userJwt", userJwt);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={authUser}>Auth User</button>
        <p>Open console to view user JWT</p>
      </header>
    </div>
  );
}

export default App;
