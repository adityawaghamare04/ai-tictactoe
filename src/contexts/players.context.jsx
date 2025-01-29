import { useState, createContext, useRef } from "react";
import { aiMove } from "../utils/aiMove";

const dataTable = {
  tableData: ["", "", "", "", "", "", "", "", ""],
  currentMove: "X",
  winninngCombinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  results: {
    draw: 0,
    human: 0,
    ai: 0,
  },
  winnedCombination: [],
};

export const PlayersContext = createContext({});

const PlayersProvider = ({ children }) => {
  const [tableData, setTableData] = useState(dataTable.tableData);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(dataTable.results);
  const [winnedCombination, setWinnedCombination] = useState(dataTable.winnedCombination);
  const [level, setLevel] = useState(3);
  // useref
  const totalMoves = useRef(0);

  // For Player Move
  const playerMove = async (rowIndex) => {
    if (tableData[rowIndex] !== "") return;
    const newTableData = await commmonOperations(tableData, rowIndex, "X");
    computerMove(newTableData);
  };

  // For Computer Move
  const computerMove = async (newTableData) => {
    if (gameOver || checkWinner(newTableData)) return;
    getAPI(newTableData).then(async (res) => {
      checkWinner(await commmonOperations(newTableData, res, "O"));
    });
  };

  const commmonOperations = async (tableData, rowIndex, player) => {
    totalMoves.current++;
    const newTableData = [...tableData];
    newTableData[rowIndex] = player;
    setTableData(newTableData);
    setProcessing((prev) => !prev);
    return newTableData;
  };

  const getAPI = async (newTableData) => {
    const state = newTableData
      .map((row) => {
        if (row === "") return "-";
        return row;
      })
      .join("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const res = aiMove(state, level);
    return res;
  };

  const checkWinner = (tableData) => {
    if (totalMoves.current >= 9) {
      setProcessing(false);
      setGameOver(true);
      setWinner("Draw");
      setResults((prev) => ({ ...prev, draw: prev.draw + 1 }));
      return "Draw";
    }

    const { winninngCombinations } = dataTable;
    for (let i = 0; i < winninngCombinations.length; i++) {
      const [a, b, c] = winninngCombinations[i];
      if (tableData[a] && tableData[a] === tableData[b] && tableData[a] === tableData[c]) {
        setWinnedCombination([a, b, c]);
        setProcessing(false);
        setGameOver(true);
        if (tableData[a] === "X") {
          setWinner("Human");
          setResults((prev) => ({ ...prev, human: prev.human + 1 }));
        } else {
          setWinner("AI");
          setResults((prev) => ({ ...prev, ai: prev.ai + 1 }));
        }
        return true;
      }
    }
    return null;
  };

  const resetGame = () => {
    setTableData(["", "", "", "", "", "", "", "", ""]);
    totalMoves.current = 0;
    setGameOver(false);
    setWinner(null);
    winnedCombination.length > 0 && setWinnedCombination([]);
  };

  return (
    <PlayersContext.Provider
      value={{
        tableData,
        setTableData,
        playerMove,
        gameOver,
        resetGame,
        winner,
        processing,
        results,
        winnedCombination,
        totalMoves,
        level,
        setLevel,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
export default PlayersProvider;
