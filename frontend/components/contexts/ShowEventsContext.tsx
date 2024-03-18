"use client"
import React, { createContext, useState } from 'react'

type Props = {
    children:React.ReactNode
}

type show_context = {
    isActive:boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShowContext = createContext<show_context|null>(null);

const ShowEventsContext = (props: Props) => {
    const [isActive,setIsActive] = useState(false);
  return (
    <ShowContext.Provider value={{isActive,setIsActive}}>
        {
            props.children
        }
    </ShowContext.Provider>
  )
}

export default ShowEventsContext