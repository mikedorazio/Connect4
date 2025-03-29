export default function Winner( {winner} ) {

    const winnerText = winner == -1 ? "DRAW...Nobody wins. 😔" : `Congratulations to player ${winner} for your victory!!`;
    return (
        <p className="winner-container">
            {winnerText}
        </p>
    )
}