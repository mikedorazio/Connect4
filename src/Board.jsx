import {useState, useEffect} from 'react';
import Cell from './Cell';
import useConnect from './useConnect';

export default function Board() {
    const rows = 6;
    const columns = 7;
    const [board, setBoard] = useState(initBoard);
    const [played, setPlayed] = useState();
    

    const {isGameOver, handleMouseup} = useConnect(board, setBoard);

    function initBoard() {
        let tempBoard = [];
        for (let i = 0; i < rows * columns; i++) {
            tempBoard.push({id: i, row: Math.floor(i / columns), column: Math.floor(i % columns)})
        }
        return tempBoard;
    }

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseup);

        if (isGameOver) {
            window.removeEventListener("mouseup", handleMouseup);
        }
        return () => {
            window.removeEventListener("mouseup", handleMouseup);
        };
    }, [handleMouseup]);

    console.log("Board ", board);

    return (
        <div className="board-container">
            {board.map((entry, index) => {
                    return <Cell key={index} entry={entry} />
            })
            }  
        </div>
    )
}