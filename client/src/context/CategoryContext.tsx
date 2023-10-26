import { createContext, useState, PropsWithChildren } from "react"

type CategoryContextType = {
  category: string | null,
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export const CategoryContext = createContext<CategoryContextType | null>(null)


const CategoryContextWrapper: React.FC<PropsWithChildren> = ({children}) => {
    const [category, setCategory] = useState<string>('Select')
  return (
    <CategoryContext.Provider value={{category, setCategory}}>
        {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextWrapper