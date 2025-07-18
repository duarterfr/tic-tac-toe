import React, { useState, useRef } from 'react';
import '../TicTacToe/TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

export const TicTacToe = () => {
    const [data, setData] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (num) => {
        if (lock || data[num] !== "") return;

        const newData = [...data];
        newData[num] = count % 2 === 0 ? "x" : "o";

        setData(newData);
        setCount(prev => prev + 1);
        checkWin(newData);
    };

    const checkWin = (currentData) => {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let [a, b, c] of wins) {
            if (
                currentData[a] &&
                currentData[a] === currentData[b] &&
                currentData[b] === currentData[c]
            ) {
                won(currentData[a]);
                return;
            }
        }

        if (!currentData.includes("")) {
            setLock(true);
            titleRef.current.innerHTML = "It's a <span>tie</span>!";
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML =
            winner === "x"
                ? `Congratulations: <img src=${cross_icon}> wins!`
                : `Congratulations: <img src=${circle_icon}> wins!`;
    };

    const reset = () => {
        setData(Array(9).fill(""));
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>
                Tic Tac Toe Game In <span>React</span>
            </h1>

            <div className="board">
                {[0, 1, 2].map(row => (
                    <div className={`row${row + 1}`} key={row}>
                        {[0, 1, 2].map(col => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    key={index}
                                    className={`boxes ${data[index] !== "" || lock ? "disabled" : ""}`}
                                    onClick={() => toggle(index)}
                                >
                                    {data[index] === "x" && <img src={cross_icon} alt="X" />}
                                    {data[index] === "o" && <img src={circle_icon} alt="O" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};
