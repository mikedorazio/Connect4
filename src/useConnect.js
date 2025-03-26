import { useState } from "react";

export default function useConnect(board, setBoard, currentPlayer, setCurrentPlayer) {
    const [validSpots, setValidSpots] = useState();
    const [isGameOver, setIsGameOver] = useState(false);
    let tempBoard = [];

    function handleMouseup(event) {
        console.log(event);
    }


    return {isGameOver, handleMouseup, validSpots}

}