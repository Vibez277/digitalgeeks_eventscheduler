"use client"
import React, { createContext, useState } from 'react'

type Props = {
    children:React.ReactNode
}

type isNew_context = {
    isNew:boolean,
    setIsNew: React.Dispatch<React.SetStateAction<boolean>>
}

export const IsNewContext = createContext<isNew_context|null>(null);

const IsNewContextProvider = (props: Props) => {
    const [isNew,setIsNew] = useState(false);
  return (
    <IsNewContext.Provider value={{isNew,setIsNew}}>
        {
            props.children
        }
    </IsNewContext.Provider>
  )
}

export default IsNewContextProvider