import {useState, useEffect} from 'react';
import ActiveCoin from './ActiveCoin';
import Winner from './Winner';

export default function DropZone() {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [dropped, setDropped] = useState([]);
    const [winner, setWinner] = useState(0);

    // Check for a winner
    function determineWinner() {
        if (didPlayerWin(1)) {
            setWinner(1);
        };

        if (didPlayerWin(2)) {
            setWinner(2);
        }
    }

    // Sets the winner state variable if there was a winner. This will end the game.
    // Check the dropped array and see if any 4 coins are consecutive and the same color
    function didPlayerWin(playerNumber) {
        const pDropped = dropped.filter(d => d.player === playerNumber);
        pDropped.forEach(({x, y}) => {
            // vertical match extending downward
            if (pDropped.find(m => x === m.x + 1 && y === m.y) &&
                pDropped.find(m => x === m.x + 2 && y === m.y) &&
                pDropped.find(m => x === m.x + 3 && y === m.y)
            ) {
                setWinner(playerNumber);
                setWinningCoins({x: x, y: y}, 0);
            }
            // horizontal match extending to right
            if (pDropped.find(m => x === m.x && y === m.y + 1) &&
                pDropped.find(m => x === m.x && y === m.y + 2) &&
                pDropped.find(m => x === m.x && y === m.y + 3)
            ) {
                setWinner(playerNumber);
                setWinningCoins({x: x, y: y}, 1);
            }
            // diagonal match extending to lower right
            if (pDropped.find(m => x === m.x + 1 && y === m.y + 1) &&
                pDropped.find(m => x === m.x + 2 && y === m.y + 2) &&
                pDropped.find(m => x === m.x + 3 && y === m.y + 3)
            ) {
                setWinner(playerNumber);
                setWinningCoins({x: x, y: y}, 2);
            }
            // diagonal match extending to lower left
            if (pDropped.find(m => x === m.x + 1 && y === m.y - 1) &&
                pDropped.find(m => x === m.x + 2 && y === m.y - 2) &&
                pDropped.find(m => x === m.x + 3 && y === m.y - 3)
            ) {
                setWinner(playerNumber);
                setWinningCoins({x: x, y: y}, 3);
            }
        })
    }

    // add a winner attribute to the 4 coins that won the game. If you use an animation that alters the css transform
    // property, it will not remember the original transform value and you will have to pass that back in again.
    // using the simple opacity property does not have this issue and works very well. 
    function setWinningCoins(location, direction) {
        console.log("location, direction", location, direction);
        // vertical
        if (direction == 0) {
            for (let i = 0; i < 4; i++) {
                let elementToHighlight = document.getElementById(`x${location.x-i},y${location.y}`);
                console.log("elementToHighlight", elementToHighlight);
                elementToHighlight.setAttribute("winner", "yes");
            }
        }
        // horizontal
        if (direction == 1) {
            for (let i = 0; i < 4; i++) {
                let elementToHighlight = document.getElementById(`x${location.x},y${location.y-i}`);
                console.log("elementToHighlight", elementToHighlight);
                elementToHighlight.setAttribute("winner", "yes");
            }
        }
        // diagonal to lower right
        if (direction == 2) {
            for (let i = 0; i < 4; i++) {
                let elementToHighlight = document.getElementById(`x${location.x-i},y${location.y-i}`);
                console.log("elementToHighlight", elementToHighlight);
                elementToHighlight.setAttribute("winner", "yes");
            }
        }
        // diagonal to lower left
        if (direction == 3) {
            for (let i = 0; i < 4; i++) {
                let elementToHighlight = document.getElementById(`x${location.x-i},y${location.y+i}`);
                console.log("elementToHighlight", elementToHighlight);
                elementToHighlight.setAttribute("winner", "yes");
            }
        }
    }

    // any time there is a drop, run this effect to see if someone won or if there are no more spaces
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
                            id={`x${entry.x},y${entry.y}`}
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