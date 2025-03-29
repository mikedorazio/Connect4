import {useState, useEffect} from 'react';
import ActiveCoin from './ActiveCoin';
import Winner from './Winner';

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
            // vertical match extending downward
            if (pDropped.find(m => x === m.x + 1 && y === m.y) &&
                pDropped.find(m => x === m.x + 2 && y === m.y) &&
                pDropped.find(m => x === m.x + 3 && y === m.y)
            ) setWinner(playerNumber);
            // horizontal match extending to right
            if (pDropped.find(m => x === m.x && y === m.y + 1) &&
                pDropped.find(m => x === m.x && y === m.y + 2) &&
                pDropped.find(m => x === m.x && y === m.y + 3)
            ) setWinner(playerNumber);
            // diagonal match extending to lower right
            if (pDropped.find(m => x === m.x + 1 && y === m.y + 1) &&
                pDropped.find(m => x === m.x + 2 && y === m.y + 2) &&
                pDropped.find(m => x === m.x + 3 && y === m.y + 3)
            ) setWinner(playerNumber);
            // diagonal match extending to lower left
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
                            drop={`x-${entry.x},y-${entry.y}`}
                            style={{transform: `translate(${entry.y*100 + entry.y*5}px, ${entry.x*100+entry.x * 5 + 150}px)`}}
                />
            )}

        {winner 
        ?  <Winner winner={winner} />
        :  <ActiveCoin currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} dropped={dropped} setDropped={setDropped} />
        }

        </div>
    )
}