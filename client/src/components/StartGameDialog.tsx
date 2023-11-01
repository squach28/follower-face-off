import { useContext } from "react"
import Dropdown from "./Dropdown"
import { CategoryContext } from "../context/CategoryContext"

type StartGameDialogProps = {
    startGame: () => void,
    categories: string[],
}

const StartGameDialog: React.FC<StartGameDialogProps> = (startGameDialogProps: StartGameDialogProps) => {
    const categoryContext = useContext(CategoryContext)
    const handleStart = () => {
        if(categoryContext) {
            if(categoryContext.category === 'Select') {
                return
            } else {
                startGameDialogProps.startGame()
            }
        }

    }

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-[#161925] text-[#8EA8C3] p-3 my-auto h-full">
            <h1 className="text-3xl font-bold">Follower Face Off</h1>
            <p className="text-center">Think you know which artists have more followers?</p>
            <div className="flex gap-5">
                <p>Category: </p>
                <Dropdown options={startGameDialogProps.categories} />
            </div>
            <button className="bg-[#23395B] text-[#CBF7ED] px-5 py-2 rounded-md font-bold" onClick={handleStart}>Start</button>
        </div>
    )
}

export default StartGameDialog