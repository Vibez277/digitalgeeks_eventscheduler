"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

const SignUp = (props: Props) => {
    const router=useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
      });
      async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const res = await fetch("https://digitalgeeks-eventscheduler.onrender.com/api/auth/signup",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            });
            const {message,success} = await res.json();
            if(success){
                router.push("/auth/signin");
            }else{
                alert(message);
            }
        } catch (error) {
            console.error(error);
        }
      }
  return (
    <div className='flex items-center justify-center flex-col w-full h-screen bg-[#efefef]'>
        <h1 className='text-3xl font-bold py-5'>DigitalGeeksz Events</h1>
        <form onSubmit={handleSubmit}  className="p-2 bg-slate-900 rounded-md max-w-[400px] w-full grid gap-3">
        <div>
            <h2 className="text-white text-center font-bold text-2xl tracking-wider">Sign Up</h2>
        </div>
        <div>
          <input
            required
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full py-1 px-2 text-white bg-slate-900 border-2 border-gray-500 rounded-md"
            onChange={(e) => {
                setData(prev=>({
                    ...prev,
                    name:e.target?.value
                }));
            }}
          />
        </div>
        <div>
          <input
            required
            type="text"
            name="email"
            placeholder="Email"
            className="w-full py-1 px-2 text-white bg-slate-900 border-2 border-gray-500 rounded-md"
            onChange={(e) => {
                setData(prev=>({
                    ...prev,
                    email:e.target?.value
                }));
            }}
          />
        </div>

        <div>
          <input
            required
            type="text"
            name="password"
            placeholder="Password"
            className="w-full py-1 px-2 text-white bg-slate-900 border-2 border-gray-500 rounded-md"
            onChange={(e) => {
                setData(prev=>({
                    ...prev,
                    password:e.target?.value
                }));
            }}
          />
        </div>
        <div className=" flex items-center justify-center gap-5">
          <input type="submit" value="Submit" className="p-2 py-1 bg-green-600 rounded-md text-white font-semibold cursor-pointer"/>
        </div>
        <div className='flex items-center justify-end'>
            <p className='text-white font-semibold'>Already have an account? <a className='text-blue-500' href="/auth/signin">Signin</a></p>
        </div>
        </form>
    </div>
  )
}

export default SignUp