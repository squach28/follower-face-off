import { useContext, useState } from "react"
import { CategoryContext } from "../context/CategoryContext"

type DropdownProps = {
    options: string[]
}

const Dropdown: React.FC<DropdownProps> = (dropdownProps: DropdownProps) => {

    const [showOptions, setShowOptions] = useState<boolean>(false)
    const categoryContext = useContext(CategoryContext)
    const toggleShowOptions = () => {
        setShowOptions(prev => !prev)
    }

    const setOption = (option: string) => {
        if(categoryContext) {
            categoryContext.setCategory(option)
        }
        setShowOptions(false)
    }
    return (
        <div className="bg-white px-2 py-1 select-none relative text-center">
            <p onClick={toggleShowOptions} className="min-w-[100px] bg-white text-black hover:cursor-pointer">{categoryContext?.category}</p>
                {
                    showOptions ?
                        <ul className={`${showOptions ? 'absolute' : 'hidden'} bg-white top-[100%] right-0 w-full`} >
                            {dropdownProps.options.map(dropdown => <li className={`w-full ${categoryContext!.category === dropdown ? 'bg-black hover:bg-black text-white font-bold' : ''} hover:cursor-pointer hover:bg-[#23395B]`} key={dropdown} onClick={() => setOption(dropdown)}>{dropdown}</li>)}
                        </ul>
                        :
                        null
                }
        </div>
    )
}

export default Dropdown