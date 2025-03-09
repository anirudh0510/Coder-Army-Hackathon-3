import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import styles from "../styles/Array.module.css";
import LinearSearch from "../Algorithms/linearSearch.js";
import BinarySearch from "../Algorithms/binarySearch.js";

import "../App.css";

function SearchingVisualiser() {
  // Descriptions for Searching Algorithms
  const algorithmDescriptions = {
    LinearSearch:
      "Linear Search sequentially checks each element in the array until the target is found. Time Complexity: O(n).",
    BinarySearch:
      "Binary Search divides the array into halves to find the target efficiently. Works only on sorted arrays. Time Complexity: O(log n).",
  };

  const options = [
    { value: "LinearSearch", label: "Linear Search" },
    { value: "BinarySearch", label: "Binary Search" },
  ];

  const [array, setArray] = useState([]);
  const [searchNumber, setSearchNumber] = useState(null);
  const [size, setSize] = useState(90);
  const [speed, setSpeed] = useState(25);
  const [algorithm, setAlgorithm] = useState(null);
  const [text, setText] = useState("Searching Visualiser");
  const [isDisable, setIsDisable] = useState(false);
  const [resetDisabled, setResetDiasabled] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    const numbers = [];
    for (var i = 0; i < size; i++) {
      var number = Math.floor(Math.random() * 50 + 1);
      numbers.push(number);
    }
    setArray(numbers);
  }

  function handleSize(event) {
    setSize(event.target.value);
    generateArray();
  }

  function handleSpeed(event) {
    setSpeed(event.target.value);
  }

  function handleResetArray() {
    generateArray();
  }

  function handleSearchNumber(event) {
    setSearchNumber(event.target.value);
  }

  async function handleSearch() {
    setIsDisable(true);
    setResetDiasabled(true);

    if (algorithm == null) {
      toast.error("Select an algorithm");
      setIsDisable(false);
      setResetDiasabled(false);
    } else {
      const { value } = algorithm;
      setText(value);

      switch (value) {
        case "LinearSearch":
          const lpos = await LinearSearch(searchNumber, speed);
          setIsDisable(false);
          setResetDiasabled(false);
          if (lpos < array.length) {
            toast.success(<h4>Element found at position {lpos + 1}</h4>);
          } else {
            toast.error("Element is not present in the array");
          }
          break;

        case "BinarySearch":
          setArray([...array].sort((a, b) => a - b));
          const bpos = await BinarySearch(searchNumber, speed);
          setIsDisable(false);
          setResetDiasabled(false);
          if (bpos === -1) {
            toast.error("Element is not present in the array");
          } else {
            toast.success(<h4>Element found at position {bpos + 1}</h4>);
          }
          break;
      }
    }
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col items-center h-[100vh] w-[100%] bg-[#FF6F61]">
        {/* Header Section */}
        <h1 className="font-bold text-2xl text-blue-900 mt-6">{text}</h1>

        {/* Algorithm Description */}
        {algorithm && (
          <p className="text-center text-gray-700 bg-white rounded-lg p-4 mt-2 w-[60%] shadow-sm">
            {algorithmDescriptions[algorithm.value]}
          </p>
        )}

        {/* Sidebar and Searching Section */}
        <div className="flex w-[100%] mt-6">
          <div className="w-[20%] h-[100%] bg-[#FF6F61] items-center flex-col p-6">
            {/* Algorithm Selection */}
            <Select
              defaultValue={algorithm}
              options={options}
              placeholder="Select an algorithm"
              onChange={setAlgorithm}
              className="w-full text-sm font-medium mb-4"
            />

            {/* Array Size */}
            <div className="flex flex-col mt-2 mb-2">
              <label className="text-black font-normal text-[13px] mb-2">
                Array Size
              </label>
              <input
                type="range"
                min="80"
                max="180"
                value={size}
                step="5"
                disabled={isDisable}
                onChange={handleSize}
                className="w-full"
              />
            </div>

            {/* Speed Control */}
            <div className="flex flex-col mt-2 mb-6">
              <label className="text-black font-normal text-[13px] mb-2">
                Speed Range
              </label>
              <input
                type="range"
                min="10"
                max="150"
                value={speed}
                step="5"
                disabled={isDisable}
                onChange={handleSpeed}
                className="w-full"
              />
            </div>

            {/* Search Input */}
            <input
              className="mt-6 mb-1 border-0 outline-none text-sm p-2 rounded-md w-full"
              type="number"
              placeholder="Enter number to search"
              onChange={handleSearchNumber}
            />

            {/* Buttons */}
            <button
              className="bg-black border-yellow-300 border-[1px] rounded-md p-2 mt-6 text-yellow-300 font-normal hover:text-blue-950 hover:bg-yellow-300 w-full"
              onClick={handleResetArray}
              disabled={resetDisabled}
            >
              Reset array
            </button>

            <button
              className="bg-black rounded-md p-2 mt-4 hover:bg-pink-300 font-normal text-[#FF6F61] w-full"
              onClick={handleSearch}
              disabled={isDisable}
            >
              Visualize
            </button>
          </div>

          {/* Searching Visualization */}
          <div className="bg-black w-[80%] flex items-end p-4" id="search">
            {array.map((value, index) => (
              <div
                className={`arrayBar ${styles.arrayBar}`}
                key={index}
                style={{
                  backgroundColor: "yellow",
                  height: `${value * 15}px`,
                  width: `${
                    document.getElementById("search").clientWidth /
                      array.length -
                    2
                  }px`,
                  margin: "1px",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchingVisualiser;
