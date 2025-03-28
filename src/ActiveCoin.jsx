import {useState, useEffect} from 'react';

export default function ActiveCoin( { currentPlayer, setCurrentPlayer, dropped, setDropped }) {
    const [row, setRow] = useState();
    const [column, setColumn] = useState();

    function handleKeyup(event) {
        switch(event.key) {
            case 'ArrowLeft':
            case 'a':
                console.log("ArrowLeft or a", column);
                if (column > 0) {
                    console.log("settin column to ", column - 1);
                    setColumn(column - 1);
                }
                break;
            case 'ArrowRight':
            case 'd':
                console.log("ArrowRight or d");
                if (column == undefined) setColumn(0);
                if (column == 6) break;
                setColumn(prev => prev + 1);
                break;
            case 'ArrowDown' :
            case 'Enter' :
            case 's' :
                console.log("ArrowDown or Enter or s");
                const totalDropped = 5 - dropped.filter(drop => drop.y == (column || 0)).length;
                console.log("totalDropped", totalDropped);
                if (totalDropped < 0) break;
                setRow(totalDropped);
                // add to dropped array only after animation is complete
                setTimeout(() => {
                    setDropped([
                        ...dropped,
                        {x: totalDropped, y: column || 0, player: currentPlayer}
                    ]);
                    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
                }, 400);
                break;
            default:
                console.log("ignore");
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup, false);
        return () => document.removeEventListener('keyup', handleKeyup);
    })

    useEffect(() => {
        console.log("useEffect when currentPlayer changes");
        setRow();
        setColumn();
    }, [currentPlayer]);

    return (
         <div className={`active p${currentPlayer} col-${column===undefined ? 'undef' : column} row-${row===undefined ? 'undef' : row}`} />
    )
}