import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import Node from "../Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import { Bfs } from "../Algorithms/Bfs";
import { Dfs } from "../Algorithms/Dfs";

function GraphVisualiser() {
  const options = [
    { value: "DFS", label: "DFS" },
    { value: "BFS", label: "BFS" },
    { value: "Dijkstra", label: "DijKstra" },
  ];

  const GRID_ROWS = 18;
  const GRID_COLS = 40;
  const [START_NODE_ROW, setStartNodeRow] = useState(10); // Fixed start node row
  const [START_NODE_COL, setStartNodeCol] = useState(5); // Fixed start node col
  const [FINISH_NODE_ROW, setFinishNodeRow] = useState(15); // Initial finish node row
  const [FINISH_NODE_COL, setFinishNodeCol] = useState(20); // Initial finish node col
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [text, setText] = useState("Graph Visualiser");
  const [algorithm, setAlgorithm] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [resetDisabled, setResetDiasabled] = useState(false);

  useEffect(() => {
    generateGrid();
  }, []);

  // Update DOM classes whenever grid changes
  useEffect(() => {
    if (grid.length > 0) {
      resetNodeClasses();
    }
  }, [grid]);

  function generateGrid() {
    const nodes = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push(createNode(col, row));
      }
      nodes.push(currentRow);
    }
    setGrid(nodes);
  }

  function createNode(col, row) {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }

  function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  function handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  async function animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    try {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          await new Promise((resolve) => setTimeout(resolve, 10));
          await animateShortestPath(nodesInShortestPathOrder);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-visited";
        } else {
          console.warn(`Node element not found: node-${node.row}-${node.col}`);
        }
      }
    } catch (error) {
      console.error("Error during animation:", error);
      toast.error("An error occurred during animation.");
    }
  }

  async function animateShortestPath(nodesInShortestPathOrder) {
    try {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-shortest-path";
        } else {
          console.warn(`Node element not found: node-${node.row}-${node.col}`);
        }
      }
    } catch (error) {
      console.error("Error during shortest path animation:", error);
      toast.error("An error occurred during shortest path animation.");
    }
  }

  function resetNodeClasses() {
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const node = grid[row][col];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          if (row === START_NODE_ROW && col === START_NODE_COL) {
            element.className = "node node-start";
          } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            element.className = "node node-finish";
          } else {
            element.className = "node";
          }
        } else {
          console.warn(`Node element not found: node-${node.row}-${node.col}`);
        }
      }
    }
  }

  function handleResetGrid() {
    console.log("Resetting grid...");

    // Randomly select new finish node position, avoiding start node
    let newFinishRow, newFinishCol;
    do {
      newFinishRow = Math.floor(Math.random() * GRID_ROWS);
      newFinishCol = Math.floor(Math.random() * GRID_COLS);
    } while (
      (newFinishRow === START_NODE_ROW && newFinishCol === START_NODE_COL) ||
      (newFinishRow === FINISH_NODE_ROW && newFinishCol === FINISH_NODE_COL) // Avoid same position as before
    );

    // Update finish node position
    setFinishNodeRow(newFinishRow);
    setFinishNodeCol(newFinishCol);

    // Generate new grid with updated start and finish positions
    const nodes = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push({
          col,
          row,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === newFinishRow && col === newFinishCol,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
        });
      }
      nodes.push(currentRow);
    }
    setGrid(nodes);

    // Reset button states
    setIsDisable(false);
    setResetDiasabled(false);
    setAlgorithm(null); // Reset algorithm selection
    setText("Graph Visualiser"); // Reset title

    console.log(
      `Grid reset complete. New finish node position: (${newFinishRow}, ${newFinishCol})`
    );
  }

  async function visualizeDijkstra() {
    try {
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = await dijkstra(grid, startNode, finishNode);
      if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
        throw new Error("Dijkstra's algorithm returned no visited nodes.");
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      await animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } catch (error) {
      console.error("Error in Dijkstra's visualization:", error);
      toast.error("An error occurred during Dijkstra's visualization.");
    }
  }

  async function visualiseBFS() {
    try {
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = await Bfs(grid, startNode, finishNode);
      if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
        throw new Error("BFS returned no visited nodes.");
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      await animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } catch (error) {
      console.error("Error in BFS visualization:", error);
      toast.error("An error occurred during BFS visualization.");
    }
  }

  async function visualiseDFS() {
    try {
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = await Dfs(grid, startNode, finishNode);
      if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
        throw new Error("DFS returned no visited nodes.");
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      await animate(visitedNodesInOrder, nodesInShortestPathOrder);
    } catch (error) {
      console.error("Error in DFS visualization:", error);
      toast.error("An error occurred during DFS visualization.");
    }
  }

  async function handleGraph() {
    console.log("Visualize button clicked. Algorithm:", algorithm);
    setIsDisable(true);
    setResetDiasabled(true);

    try {
      if (algorithm == null) {
        toast.error("Select an algorithm");
        setIsDisable(false);
        setResetDiasabled(false);
        return;
      }

      const { value, label } = algorithm;
      setText(value);

      switch (value) {
        case "BFS":
          await visualiseBFS();
          break;
        case "DFS":
          await visualiseDFS();
          break;
        case "Dijkstra":
          await visualizeDijkstra();
          break;
        default:
          toast.error("Unknown algorithm selected.");
      }
    } catch (error) {
      console.error("Error in handleGraph:", error);
      toast.error("An error occurred during visualization.");
    } finally {
      console.log("Re-enabling buttons...");
      setIsDisable(false);
      setResetDiasabled(false);
    }
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex h-[100vh] w-[100%]">
        <div className="w-[20%] h-[100vh] bg-[#FF6F61] items-center flex-col">
          <h1 className="font-semibold text-black text-2xl p-6 mt-3 mb-20 ml-[15px]">
            {text}
          </h1>

          <div className="flex flex-col justify-center p-6 h-[45%] w-[100%]">
            <Select
              defaultValue={algorithm}
              options={options}
              placeholder="Select an algorithm"
              onChange={setAlgorithm}
            />

            <button
              className={`bg-black border-solid border-yellow-300 border-[1px] rounded-md p-2 mt-6 text-yellow-300 font-normal ${
                resetDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-950 hover:bg-yellow-300"
              }`}
              onClick={handleResetGrid}
              disabled={resetDisabled}
            >
              Reset Grid
            </button>

            <button
              className={`bg-black rounded-md p-2 mt-4 font-normal text-[#FF6F61] ${
                isDisable
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-pink-300"
              }`}
              onClick={handleGraph}
              disabled={isDisable}
            >
              Visualize
            </button>
          </div>
        </div>
        <div
          className="h-[100vh] w-[80%] flex justify-center items-center"
          id="test"
        >
          <div>
            {grid.map((row, rowidx) => (
              <div key={rowidx}>
                {row.map((node, nodeidx) => {
                  const { col, row, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      key={nodeidx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphVisualiser;
