"use client"
import React, { createContext, useState } from 'react'

type Props = {
    children:React.ReactNode
}

type add_context = {
    isActive:boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddContext = createContext<add_context|null>(null);

const AddEventModalContext = (props: Props) => {
    const [isActive,setIsActive] = useState(false);
  return (
    <AddContext.Provider value={{isActive,setIsActive}}>
        {
            props.children
        }
    </AddContext.Provider>
  )
}

export default AddEventModalContext