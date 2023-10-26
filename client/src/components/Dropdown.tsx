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
        <div className="bg-white px-2 py-1 select-none relative text-center">
            <p onClick={toggleShowOptions} className="min-w-[100px]">{categoryContext?.category}</p>
                {
                    showOptions ?
                        <ul className={`${showOptions ? 'absolute' : 'hidden'} bg-white top-[100%] right-0 w-full`} >
                            {dropdownProps.options.map(dropdown => <li className="w-full" key={dropdown} onClick={() => setOption(dropdown)}>{dropdown}</li>)}
                        </ul>
                        :
                        null
                }
        </div>
    )
}

export default Dropdown