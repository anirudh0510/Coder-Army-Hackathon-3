"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

const sortingAlgorithms = [
  { name: "Bubble Sort", speed: 50, complexity: "O(n²)" },
  { name: "Merge Sort", speed: 30, complexity: "O(n log n)" },
  { name: "Quick Sort", speed: 20, complexity: "O(n log n)" },
  { name: "Heap Sort", speed: 25, complexity: "O(n log n)" },
];

const searchingAlgorithms = [
  { name: "Linear Search", speed: 40, complexity: "O(n)" },
  { name: "Binary Search", speed: 15, complexity: "O(log n)" },
];

const graphAlgorithms = [
  { name: "BFS", speed: 35, complexity: "O(V + E)" },
  { name: "DFS", speed: 30, complexity: "O(V + E)" },
  { name: "Dijkstra", speed: 25, complexity: "O((V + E) log V)" },
];

// Particle effect component for background
function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#FF6F61]"
          initial={{
            opacity: Math.random() * 0.5 + 0.1,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 2 + 0.5,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [Math.random() * 0.5 + 0.1, Math.random() * 0.3],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Animated text that reveals character by character
function AnimatedText({ text, className, delay = 0 }) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {characters.map((character, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{
            textShadow:
              character !== " " ? "0 0 15px rgba(255, 111, 97, 0.5)" : "none",
          }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </motion.span>
  );
}

function AlgorithmRace({ title, algorithms }) {
  const [progress, setProgress] = useState(algorithms.map(() => 0));
  const [finished, setFinished] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev.map((p, i) => {
          // If already at 100%, keep it there
          if (p >= 100) return 100;

          // Calculate the new progress
          const increment = Math.random() * (100 / algorithms[i].speed);
          const newValue = p + increment;

          // If very close to 100% (e.g., >= 96%), force to 100% to avoid floating-point issues
          return newValue >= 95 ? 100 : newValue; // Modified threshold from 99.5% to 96%
        });

        // Check if all algorithms have finished
        if (newProgress.every((p) => p >= 100)) {
          clearInterval(interval);
          setIsRunning(false); // Stop the race
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [algorithms, isRunning]);

  useEffect(() => {
    const newFinished = [];

    // Find algorithms that just finished
    progress.forEach((p, i) => {
      if (p >= 100 && !finished.includes(algorithms[i].name)) {
        newFinished.push(algorithms[i].name);
      }
    });

    // Add newly finished algorithms to the leaderboard
    if (newFinished.length > 0) {
      setFinished((prev) => [...prev, ...newFinished]);
    }
  }, [progress, algorithms, finished]);

  const resetRace = () => {
    setProgress(algorithms.map(() => 0));
    setFinished([]);
    setIsRunning(true);
  };

  return (
    <motion.div
      className="p-8 max-w-5xl mx-auto space-y-8 rounded-xl border border-[#FF6F61]/20 relative"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95))",
        boxShadow:
          "0 10px 30px -10px rgba(255, 111, 97, 0.2), 0 0 8px rgba(255, 111, 97, 0.1) inset",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6F61]/5 to-transparent opacity-50" />
      </div>

      <div className="flex justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-white">
            {title} <span className="text-[#FF6F61]">Race Mode</span>
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 15, 0] }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
              }}
              className="inline-block ml-2"
            >
              🚀
            </motion.span>
          </h1>
        </motion.div>

        <motion.button
          onClick={resetRace}
          className="px-5 py-2.5 bg-[#FF6F61] text-black font-medium rounded-md hover:bg-[#FF6F61]/90 transition-all relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Reset Race</span>
          <motion.span
            className="absolute inset-0 bg-white"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            style={{ opacity: 0.3 }}
          />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {algorithms.map((algo, index) => (
          <motion.div
            key={algo.name}
            className="bg-black/60 backdrop-blur-sm border border-gray-800 p-6 rounded-lg relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onHoverStart={() => setIsHovering(index)}
            onHoverEnd={() => setIsHovering(null)}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(255, 111, 97, 0.3)",
              borderColor: "rgba(255, 111, 97, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6F61]/10 to-transparent opacity-30" />

            {/* Glowing effect when algorithm finishes */}
            {progress[index] >= 100 && (
              <motion.div
                className="absolute inset-0 bg-[#FF6F61]/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-white flex items-center">
                  {algo.name}
                  {isHovering === index && (
                    <motion.span
                      className="ml-2 text-[#FF6F61] text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {algo.speed < 25
                        ? "⚡ Fast"
                        : algo.speed > 40
                        ? "🐢 Slow"
                        : "🚶 Medium"}
                    </motion.span>
                  )}
                </h2>
                <span className="text-[#FF6F61] font-mono px-2 py-1 bg-[#FF6F61]/10 rounded-md">
                  {algo.complexity}
                </span>
              </div>

              <div className="w-full bg-gray-900 rounded-full h-3 mb-4 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress[index]}%`,
                    background:
                      "linear-gradient(90deg, rgba(255,111,97,0.7) 0%, rgba(255,111,97,1) 100%)",
                    boxShadow: "0 0 10px rgba(255, 111, 97, 0.5)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress[index]}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Speed Factor: {100 - algo.speed}
                </span>
                <motion.span
                  className={`font-medium ${
                    progress[index] < 100 ? "text-white" : "text-[#FF6F61]"
                  }`}
                  animate={{
                    scale: progress[index] === 100 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: progress[index] === 100 ? 1 : 0,
                  }}
                >
                  {progress[index] < 100 ? (
                    `${Math.floor(progress[index])}%`
                  ) : (
                    <span>
                      Finished! <span className="ml-1">🏁</span>
                    </span>
                  )}
                </motion.span>
              </div>
            </div>

            {finished.includes(algo.name) && (
              <motion.div
                className="absolute top-3 right-3 bg-[#FF6F61] text-black font-bold px-3 py-1.5 rounded-md text-sm"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.1,
                }}
              >
                #{finished.indexOf(algo.name) + 1}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {finished.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 relative z-10"
          >
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-[#FF6F61]/30 to-transparent w-full mr-4" />
              <h2 className="text-2xl font-bold text-white text-center whitespace-nowrap">
                <span className="text-[#FF6F61]">Leaderboard</span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                  className="inline-block ml-2"
                >
                  🏆
                </motion.span>
              </h2>
              <div className="h-px bg-gradient-to-r from-[#FF6F61]/30 via-[#FF6F61]/30 to-transparent w-full ml-4" />
            </motion.div>

            <div className="overflow-hidden rounded-lg border border-gray-800 bg-black/40 backdrop-blur-sm">
              <table className="min-w-full">
                <thead className="bg-black/60">
                  <tr>
                    <th className="p-3 text-left text-gray-400 font-medium">
                      Rank
                    </th>
                    <th className="p-3 text-left text-gray-400 font-medium">
                      Algorithm
                    </th>
                    <th className="p-3 text-left text-gray-400 font-medium">
                      Time Complexity
                    </th>
                    <th className="p-3 text-left text-gray-400 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {finished.map((algo, index) => {
                    const algorithm = algorithms.find((a) => a.name === algo);
                    return (
                      <motion.tr
                        key={algo}
                        className="border-t border-gray-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{
                          backgroundColor: "rgba(255, 111, 97, 0.05)",
                        }}
                      >
                        <td className="p-3">
                          <motion.div
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF6F61]/20 text-[#FF6F61] font-bold"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgba(255, 111, 97, 0.3)",
                            }}
                          >
                            {index + 1}
                          </motion.div>
                        </td>
                        <td className="p-3 text-white font-medium">{algo}</td>
                        <td className="p-3 text-gray-400 font-mono">
                          {algorithm?.complexity || "-"}
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FF6F61]/10 text-[#FF6F61]">
                            Completed
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AlgorithmRaceModes() {
  const titleRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black py-12 px-4 space-y-16 relative">
      {/* Particle background */}
      <ParticleBackground />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#FF6F61]/10 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#FF6F61]/10 to-transparent opacity-30" />

      <motion.div
        className="max-w-5xl mx-auto text-center mb-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        ref={titleRef}
      >
        <div className="mb-6 relative">
          <motion.div
            className="absolute -inset-10 rounded-full opacity-20 blur-3xl"
            animate={{
              background: [
                "radial-gradient(circle, rgba(255,111,97,0.3) 0%, rgba(0,0,0,0) 70%)",
                "radial-gradient(circle, rgba(255,111,97,0.1) 0%, rgba(0,0,0,0) 70%)",
                "radial-gradient(circle, rgba(255,111,97,0.3) 0%, rgba(0,0,0,0) 70%)",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative">
            <AnimatedText
              text="Algorithm"
              className="text-5xl md:text-6xl font-bold text-white inline-block mr-4"
              delay={0.1}
            />
            <AnimatedText
              text="Racing"
              className="text-5xl md:text-6xl font-bold text-[#FF6F61] inline-block mr-4"
              delay={0.6}
            />
            <AnimatedText
              text="Simulator"
              className="text-5xl md:text-6xl font-bold text-white inline-block"
              delay={1.1}
            />
          </div>

          <motion.div
            className="h-1 w-0 bg-gradient-to-r from-transparent via-[#FF6F61] to-transparent mx-auto mt-4"
            animate={{ width: "60%" }}
            transition={{ duration: 1.5, delay: 1.8 }}
          />
        </div>

        <motion.p
          className="text-gray-400 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          Watch different algorithms compete in real-time. Visualize their
          performance characteristics and see which ones finish first in this
          interactive racing simulator.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.3 }}
        >
          <motion.a
            href="#sorting"
            className="px-6 py-3 bg-[#FF6F61] text-black font-medium rounded-md hover:bg-[#FF6F61]/90 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 111, 97, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Racing
          </motion.a>
          <motion.a
            href="#about"
            className="px-6 py-3 bg-transparent text-[#FF6F61] font-medium rounded-md border border-[#FF6F61] hover:bg-[#FF6F61]/10 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 111, 97, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>

      <div id="sorting">
        <AlgorithmRace
          title="Sorting Algorithms"
          algorithms={sortingAlgorithms}
        />
      </div>

      <div id="searching">
        <AlgorithmRace
          title="Searching Algorithms"
          algorithms={searchingAlgorithms}
        />
      </div>

      <div id="graph">
        <AlgorithmRace title="Graph Algorithms" algorithms={graphAlgorithms} />
      </div>

      <motion.div
        id="about"
        className="max-w-4xl mx-auto p-8 rounded-xl bg-black/60 border border-gray-800 mt-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6F61]/0 via-[#FF6F61]/30 to-[#FF6F61]/0 rounded-xl opacity-30 blur-sm" />
        <div className="relative">
          <h2 className="text-2xl font-bold text-white mb-4">
            About Algorithm Racing
          </h2>
          <p className="text-gray-400">
            This simulator visualizes how different algorithms perform relative
            to each other. The race speed is based on the algorithm's
            theoretical time complexity, but simplified for visualization. In
            real-world scenarios, performance depends on many factors including
            input size, hardware, and implementation details.
          </p>
        </div>
      </motion.div>

      <div className="h-20"></div>
    </div>
  );
}
