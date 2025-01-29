import { useContext } from "react";
import { PlayersContext } from "../../contexts/players.context";
import "./Level.styles.scss";

const Level = () => {
  const { level, setLevel, tableData } = useContext(PlayersContext);

  const handleLevel = (level) => {
    //   check if tableData every cell is blank
    if (tableData.every((cell) => cell === "")) {
      setLevel(level);
    } else {
      alert("You can't change level while playing");
    }
  };

  return (
    <div className="level">
      {/* 3 button */}
      <button className={`${level === 1 ? "active" : ""} level-btn`} onClick={() => handleLevel(1)}>
        Easy
      </button>
      <button className={`${level === 2 ? "active" : ""} level-btn`} onClick={() => handleLevel(2)}>
        Medium
      </button>
      <button className={`${level === 3 ? "active" : ""} level-btn`} onClick={() => handleLevel(3)}>
        Hard
      </button>
    </div>
  );
};

export default Level;
