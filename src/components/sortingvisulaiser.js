import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import styles from "../styles/Array.module.css";
import BubbleSort from "../Algorithms/bubbleSort.js";
import InsertionSort from "../Algorithms/insertionSort.js";
import SelectionSort from "../Algorithms/selectionSort.js";
import MergeSort from "../Algorithms/mergeSort.js";
import QuickSort from "../Algorithms/quickSort.js";

import "../App.css";

function SortingVisualiser() {
  // Sorting algorithm descriptions
  const algorithmDescriptions = {
    BubbleSort:
      "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Time Complexity: O(n²).",
    InsertionSort:
      "Insertion Sort builds the sorted array one item at a time, shifting elements as needed. Time Complexity: O(n²), but efficient for small or nearly sorted data.",
    SelectionSort:
      "Selection Sort repeatedly finds the minimum element and moves it to the beginning. Time Complexity: O(n²).",
    MergeSort:
      "Merge Sort is a divide-and-conquer algorithm that splits the array, sorts subarrays, and merges them. Time Complexity: O(n log n).",
    QuickSort:
      "Quick Sort selects a pivot, partitions the array, and recursively sorts subarrays. Time Complexity: O(n log n) on average.",
  };

  const options = [
    { value: "BubbleSort", label: "Bubble Sort" },
    { value: "InsertionSort", label: "Insertion Sort" },
    { value: "SelectionSort", label: "Selection Sort" },
    { value: "MergeSort", label: "Merge Sort" },
    { value: "QuickSort", label: "Quick Sort" },
  ];

  const [array, setArray] = useState([]);
  const [size, setSize] = useState(90);
  const [speed, setSpeed] = useState(25);
  const [algorithm, setAlgorithm] = useState(null);
  const [text, setText] = useState("Sorting Visualiser");
  const [isDisable, setIsDisable] = useState(false);
  const [resetDisabled, setResetDiasabled] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    const numbers = [];
    for (var i = 0; i < size; i++) {
      var number = Math.floor(Math.random() * 30 + 1);
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

  async function handleSort() {
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
        case "BubbleSort":
          await BubbleSort(speed);
          break;
        case "SelectionSort":
          await SelectionSort(speed);
          break;
        case "InsertionSort":
          await InsertionSort(speed);
          break;
        case "MergeSort":
          await MergeSort(speed);
          break;
        case "QuickSort":
          await QuickSort(speed);
          break;
        default:
          break;
      }

      setIsDisable(false);
      setResetDiasabled(false);
      toast.success("Completed");
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

        {/* Sidebar and Sorting Section */}
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
              onClick={handleSort}
              disabled={isDisable}
            >
              Visualize
            </button>
          </div>

          {/* Sorting Visualization */}
          <div
            className="bg-black w-[79.999%] h-[100vh] flex items-end p-4"
            id="sort"
          >
            {array.map((value, index) => (
              <div
                className={`arrayBar ${styles.arrayBar}`}
                key={index}
                style={{
                  backgroundColor: "yellow",
                  height: `${value * 15}px`,
                  width: `${
                    document.getElementById("sort").clientWidth / array.length -
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

export default SortingVisualiser;
