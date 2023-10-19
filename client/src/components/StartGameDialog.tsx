type StartGameDialogProps = {
    startGame: () => void
}

const StartGameDialog: React.FC<StartGameDialogProps> = (startGameDialogProps: StartGameDialogProps) => {

    const handleStart =() => {
        startGameDialogProps.startGame()
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-500 p-3 my-auto h-full">
            <h1 className="text-3xl">Follower Face Off</h1>
            <p>Think you know which artists are the most popular?</p>
            
            <button className="bg-green-500 px-5 py-2 rounded-md font-bold" onClick={handleStart}>Start</button>
        </div>
    )
}

export default StartGameDialog