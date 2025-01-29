import { useContext } from "react";
import { PlayersContext } from "../../contexts/players.context";
import "./Game.styles.scss";

const Game = () => {
  const { tableData, playerMove, processing, gameOver, resetGame, winnedCombination, totalMoves } = useContext(PlayersContext);

  const handlePlayerMove = (rowIndex) => {
    if (processing) return;
    return gameOver ? resetGame() : playerMove(rowIndex);
  };
  console.log(tableData);
  return (
    <div>
      <div className={`game ${processing ? "processing" : ""}`}>
        <div className={`game-table ${gameOver ? "game-over" : ""} ${totalMoves.current === 9 ? "draw" : ""}`}>
          {tableData.map((row, rowIndex) => {
            return (
              <div
                className={`game-box  ${winnedCombination.includes(rowIndex) ? "winned" : ""}`}
                key={rowIndex}
                onClick={() => handlePlayerMove(rowIndex)}
              >
                <p>{row}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;
