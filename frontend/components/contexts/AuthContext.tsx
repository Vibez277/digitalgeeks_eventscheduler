
"use client"
import { redirect } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'

type Props = {
    children:React.ReactNode
}

type auth_context = {
    isAuthorized:boolean,
    user:any,
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<auth_context|null>(null);

const AuthContextProvider = (props: Props) => {
    const [isAuthorized,setIsAuthorized] = useState(false);
    const [user,setUser] = useState(false);
    async function checkAuth(){
        try {
          const res = await fetch("https://digitalgeeks-eventscheduler.onrender.com/api/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const { message, success,user } = await res.json();
          if (success) {
            setIsAuthorized(true);
            setUser(user)
            return;
          }
        } catch (error) {
          console.error(error);
        }
      }
      checkAuth();
  return (
    <AuthContext.Provider value={{isAuthorized,setIsAuthorized,user}}>
        {
            props.children
        }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

