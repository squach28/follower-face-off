import { useState } from "react"

type StartGameDialogProps = {
    startGame: () => void,
    categories: string[],
    selectCategory: (category: string) => void 
}

const StartGameDialog: React.FC<StartGameDialogProps> = (startGameDialogProps: StartGameDialogProps) => {
    const [category, setCategory] = useState<string>('pop')

    const handleStart = () => {
        startGameDialogProps.selectCategory(category)
        startGameDialogProps.startGame()
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-500 p-3 my-auto h-full">
            <h1 className="text-3xl font-bold">Follower Face Off</h1>
            <p>Think you know which artists are the most popular?</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                {startGameDialogProps.categories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
            <button className="bg-green-500 px-5 py-2 rounded-md font-bold" onClick={handleStart}>Start</button>
        </div>
    )
}

export default StartGameDialog