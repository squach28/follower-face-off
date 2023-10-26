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
            console.log('setting!')
            categoryContext.setCategory(option)
        }
        setShowOptions(false)
    }

    console.log(categoryContext)
    return (
        <div className="bg-white px-2 py-1 select-none">
            <p onClick={toggleShowOptions} className="relative">{categoryContext?.category}</p>
            <div className="relative">
                {
                    showOptions ?
                        <ul className="absolute bg-white top-0 right-0" >
                            {dropdownProps.options.map(dropdown => <li key={dropdown} onClick={() => setOption(dropdown)}>{dropdown}</li>)}
                        </ul>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Dropdown