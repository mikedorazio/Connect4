import {useState, useEffect} from 'react';

export default function ActiveCoin( { currentPlayer, setCurrentPlayer, dropped, setDropped }) {
    const [row, setRow] = useState();
    const [column, setColumn] = useState(5);

    function handleKeyup(event) {
        switch(event.key) {
            case 'ArrowLeft':
                console.log("ArrowLeft");
                if (column == 0) break;
                setColumn(prev => prev - 1);
                break;
            case 'ArrowRight':
                console.log("ArrowRight");
                if (column == undefined) setColumn(0);
                if (column == 6) break;
                setColumn(prev => prev + 1);
                break;
            case 'ArrowDown' :
            case 'Enter' :
                console.log("ArrowDown or Enter");
                setRow(5);
                // add to dropped array only after animation is complete
                setTimeout(() => {
                    setDropped([
                        ...dropped,
                        {x: 5, y: column, player: currentPlayer}
                    ]);
                    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
                }, 500);
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
        setRow();
        setColumn(0);
    }, [currentPlayer]);

    return (

        <div className={`active p${currentPlayer} col-${column} row-${row}`} />

    )
}