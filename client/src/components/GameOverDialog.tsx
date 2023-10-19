type GameOverDialogProps = {
    streak: number,
    startGame: () => void,
    goToMenu: () => void
}

const GameOverDialog: React.FC<GameOverDialogProps> = (gameOverDialogProps: GameOverDialogProps) => {
  return (
    <div className="flex flex-col justify-center text-white items-center h-full gap-3">
        <p>Game Over!</p>
        <p>Your streak was: {gameOverDialogProps.streak}</p>
        <button className="p-2 rounded-md border-2" onClick={gameOverDialogProps.goToMenu}>Go to menu</button>
        <button className="p-2 rounded-md border-2" onClick={gameOverDialogProps.startGame}>Play again</button>
    </div>
  )
}

export default GameOverDialog