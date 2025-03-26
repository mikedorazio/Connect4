import {useState} from 'react';
import ActiveCoin from './ActiveCoin';

export default function DropZone() {
    const [currentPlayer, setCurrentPlayer] = useState(2);
    const [dropped, setDropped] = useState([
        {x: 5, y: 4, player: 1},
        {x: 4, y: 1, player: 2},
        {x: 3, y: 2, player: 2},
        {x: 1, y: 3, player: 1}
    ]);

    return (
        <div className="drop-zone">
           {dropped.map((entry, index) =>
                <div key={index} className={`p${entry.player}`} 
                            style={{transform: `translate(${entry.y*100 + entry.y*5}px, ${entry.x*100+entry.x * 5 + 150}px)`}}
                />
            )}

        <ActiveCoin currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} dropped={dropped} setDropped={setDropped} />

        </div>
    )
}