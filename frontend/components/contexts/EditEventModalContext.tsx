"use client"
import React, { createContext, useState } from 'react'

type Props = {
    children:React.ReactNode
}

type edit_context = {
    isActive:boolean,
    eventId:string,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    setEventId: React.Dispatch<React.SetStateAction<string>>
}

export const EditContext = createContext<edit_context|null>(null);

const EditEventModalContext = (props: Props) => {
    const [isActive,setIsActive] = useState(false);
    const [eventId,setEventId] = useState("");
  return (
    <EditContext.Provider value={{isActive,setIsActive,eventId,setEventId}}>
        {
            props.children
        }
    </EditContext.Provider>
  )
}

export default EditEventModalContext