import {useState, useEffect} from 'react';
import Cell from './Cell';

export default function Board() {
    const rows = 6;
    const columns = 7;
    const [board, setBoard] = useState(initBoard);
    const [played, setPlayed] = useState();

    function initBoard() {
        let tempBoard = [];
        for (let i = 0; i < rows * columns; i++) {
            tempBoard.push({id: i, row: Math.floor(i / columns), column: Math.floor(i % columns)})
        }
        return tempBoard;
    }

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