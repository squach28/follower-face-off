type GameOverDialogProps = {
    streak: number,
    startGame: () => void,
    goToMenu: () => void
}

const GameOverDialog: React.FC<GameOverDialogProps> = (gameOverDialogProps: GameOverDialogProps) => {
  return (
    <div className="flex flex-col justify-center bg-[#161925] text-[#8EA8C3] items-center h-full gap-3">
        <p>Game Over!</p>
        <p>Your streak was: {gameOverDialogProps.streak}</p>
        <button className="p-2 rounded-md border-2 hover:bg-white hover:text-[#161925]" onClick={gameOverDialogProps.goToMenu}>Go to menu</button>
        <button className="p-2 rounded-md border-2 hover:bg-white hover:text-[#161925]" onClick={gameOverDialogProps.startGame}>Play again</button>
    </div>
  )
}

export default GameOverDialog