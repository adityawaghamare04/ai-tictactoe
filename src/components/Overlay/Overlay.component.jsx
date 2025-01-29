import { useContext } from "react";
import { PlayersContext } from "../../contexts/players.context";
const Overlay = () => {
  const { resetGame, winner } = useContext(PlayersContext);
  return (
    <div className="overlay">
      <div className="">
        <h1>{winner}</h1>
        <button onClick={resetGame}>Play Again</button>
      </div>
    </div>
  );
};
export default Overlay;
