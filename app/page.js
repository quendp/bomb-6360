"use client";
import { useState } from "react";

export default function Home() {
  const [numArray, setNumArray] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const onChangeInput = (e) => {
    const array = Array.from({ length: e.target.value }, (_, i) => ({
      id: i,
      value: (Math.random() * 100).toFixed(0) % 2 === 0,
      show: false,
    }));
    setNumArray(array);
  };

  const resetArray = () => {
    setGameOver(false);
    setNumArray([]);
    setScore(0)
  };

  const onClickItem = (num) => {
    if (gameOver) return;
    const filteredArr = [...numArray].map((i) =>
      i.id === num.id
        ? {
            ...i,
            show: true,
          }
        : i
    );
    setNumArray(filteredArr);
    if (!num.value) {
      setGameOver(true);
    } else {
      setScore((prev) => prev + 1)
    }
  }

  console.log(numArray);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <p>Score: {score}</p>
      </div>
      <div>
        <input
          type="number"
          value={numArray?.length}
          onChange={onChangeInput}
        />
      </div>
      <div className="container">
        {numArray.map((num) => (
          <div
            className={`items ${num.value ? "safe" : "bomb"} ${
              num.show ? "" : "hide"
            }`}
            key={num.id}
            onClick={() => onClickItem(num)}
          >
            {
              num.show ? (num.value ? "Safe" : "Bomb" ) : ""
            }
          </div>
        ))}
      </div>
      <div>{gameOver && <button onClick={resetArray}>Reset</button>}</div>
    </main>
  );
}
