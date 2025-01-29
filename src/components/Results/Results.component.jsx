import { useContext } from "react";
import { PlayersContext } from "../../contexts/players.context";

import "./Results.styles.scss";
const Results = () => {
  const { results, resetGame } = useContext(PlayersContext);
  const { human, ai, draw } = results;
  return (
    <>
      <div className="reset">
        {/* 3 button */}
        <button className={` reset-btn`} onClick={() => resetGame()}>
          Reset
        </button>
      </div>
      <div className="results-container">
        <div className="result-box">
          <h3>Human</h3>
          <h3>{human}</h3>
        </div>
        <div className="result-box">
          <h3>Draw</h3>
          <h3>{draw}</h3>
        </div>
        <div className="result-box">
          <h3>AI</h3>
          <h3>{ai}</h3>
        </div>
      </div>
    </>
  );
};

export default Results;
