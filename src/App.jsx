import "./App.scss";
import Game from "./components/Game/Game.component";
import Level from "./components/Level/Level.component";
import Results from "./components/Results/Results.component";

function App() {
  return (
    <div className="App">
      {/* heading for tic-tac-toe game */}
      <h1>Tic Tac Toe</h1>
      <Level />
      <Game />
      <Results />
    </div>
  );
}

export default App;
