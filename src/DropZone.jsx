import {useState, useEffect} from 'react';
import ActiveCoin from './ActiveCoin';

export default function DropZone() {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [dropped, setDropped] = useState([]);
    const [winner, setWinner] = useState(0);

    function determineWinner() {
        if (didPlayerWin(1)) {
            setWinner(1);
        };

        if (didPlayerWin(2)) {
            setWinner(2);
        }

    }

    function didPlayerWin(playerNumber) {
        const pDropped = dropped.filter(d => d.player === playerNumber);

        pDropped.forEach(({x, y}) => {
            if (pDropped.find(m => x === m.x +1 && y === m.y) &&
                pDropped.find(m => x === m.x +2 && y === m.y) &&
                pDropped.find(m => x === m.x +3 && y === m.y)
            ) setWinner(playerNumber);
            if (pDropped.find(m => x === m.x && y === m.y + 1) &&
                pDropped.find(m => x === m.x && y === m.y + 2) &&
                pDropped.find(m => x === m.x && y === m.y + 3)
            ) setWinner(playerNumber);
            if (pDropped.find(m => x === m.x + 1 && y === m.y + 1) &&
                pDropped.find(m => x === m.x + 2 && y === m.y + 2) &&
                pDropped.find(m => x === m.x + 3 && y === m.y + 3)
            ) setWinner(playerNumber);
            if (pDropped.find(m => x === m.x + 1 && y === m.y - 1) &&
                pDropped.find(m => x === m.x + 2 && y === m.y - 2) &&
                pDropped.find(m => x === m.x + 3 && y === m.y - 3)
            ) setWinner(playerNumber); 
        })
    }

    useEffect(() => {
        if (dropped.length == 42) {
            console.log("DRAW");
            setWinner(-1);
        }

        determineWinner();
    }, [dropped.length]);

    return (
        <div className="drop-zone">
           {dropped.map((entry, index) =>
                <div key={index} className={`p${entry.player}`} 
                            style={{transform: `translate(${entry.y*100 + entry.y*5}px, ${entry.x*100+entry.x * 5 + 150}px)`}}
                />
            )}

        {winner 
        ?  <div>Winner {winner} </div>
        :  <ActiveCoin currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} dropped={dropped} setDropped={setDropped} />
        }

        </div>
    )
}