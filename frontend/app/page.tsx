"use client";
import EventsView from "@/components/EventsView";
import { AddContext } from "@/components/contexts/AddEventModalContext";
import { AuthContext } from "@/components/contexts/AuthContext";
import { IsNewContext } from "@/components/contexts/IsNewContext";
import { ShowContext } from "@/components/contexts/ShowEventsContext";
import { getDaysInMonth } from "@/utils/calendar";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",

  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();
export default function Home() {
  const [days, setDays] = React.useState<
    { day: number; isNext: boolean; isPrev: boolean,dayOfWeek:number,isActive:boolean }[]
  >([]);
  const router = useRouter()
  const [currentMonth, setcurrentMonth] = useState(date.getMonth());
  const [currentYear, setcurrentYear] = useState(date.getFullYear());
  const showSelf = useContext(ShowContext);
  const addModal = useContext(AddContext);
  const isNewContext = useContext(IsNewContext);
  const auth = useContext(AuthContext);

  const e = !auth?.isAuthorized;
  if(!e){
    router.push('/auth/signin');
    return;
  }

  const [selected, setSelected] = useState<{
    date:number|undefined,
    day:number|undefined,
    month:number|undefined,
    year:number|undefined
  }>({
    date:date.getDate(),
    day:date.getDay(),
    month:currentMonth,
    year:currentYear
  })

  function nextMonth(){
    if(currentMonth===11){
      setcurrentMonth(0);
      setcurrentYear(currentYear+1);
    }else{
      setcurrentMonth(currentMonth+1);
    }
  }
  function prevMonth(){
    if(currentMonth===0){
      setcurrentMonth(11);
      setcurrentYear(currentYear-1);
    }else{
      setcurrentMonth(currentMonth-1);
    }
  }

  const getDays = async()=>{
    try {
      const arr = await getDaysInMonth(currentMonth,currentYear);
      setDays(arr);
      isNewContext?.setIsNew(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDays();
  }, [currentMonth,isNewContext?.isNew===true]);

  return (
    <main className="min-h-screen w-full flex items-center gap-5">
      <div className="main flex-grow px-2">
        <div className="flex items-center justify-between w-full min-w-[250px]">
          <div className="month-year flex items-center gap-3 mx-auto select-none">
            <p className="text-xl sm:text-2xl font-bold">{months[currentMonth]}</p>
            <p className="text-xl sm:text-2xl font-bold">{currentYear}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaChevronLeft onClick={prevMonth}/>
            <p className="font-semibold cursor-pointer hover:bounce select-none" onClick={()=>{
              setcurrentMonth(date.getMonth());
              setcurrentYear(date.getFullYear())
            }}>Today</p>
            <FaChevronRight onClick={nextMonth} />
          </div>
        </div>

        <div className="calendar mt-5">
          <div className="days_of_week grid grid-cols-7 text-center select-none">
            <p className="text-sm font-bold border-x-[0.5px] border-gray-300">
              Sun
            </p>
            <p className="text-sm font-bold border-x-[0.5px] border-gray-300">
              Mon
            </p>
            <p className="text-sm font-bold border-x-[0.5px] border-gray-300">
              Tue
            </p>
            <p className="text-sm font-bold border-x-[0.5px] border-gray-300">
              Wed
            </p>
            <p className="text-sm font-bold border-x-[0.5px] border-gray-300">
              Thu
            </p>
            <p className="text-sm font-bold border-x-[0.5px] border-gray-300">
              Fri
            </p>
            <p className="text-sm font-bold border-x-[0.5px] border-gray-300">
              Sat
            </p>
          </div>
          <div className="dates grid grid-cols-7 grid-rows-6 text-center gap-3 mt-5">
            {days.map((day ,index) =>
              day.isPrev ? (
                <p key={day.day+index} className="text-sm cursor-pointer text-gray-400 font-semibold bg-gray-100 mx-auto w-[30px] h-[30px] p-2 flex items-center justify-center rounded-full">
                  {day.day}
                </p>
              ) : day.isNext ? (
                <p key={day.day+index} className="text-sm cursor-pointer text-gray-400 font-semibold bg-gray-100 mx-auto w-[30px] h-[30px] p-2 flex items-center justify-center rounded-full">
                  {day.day}
                </p>
              ) : (
                <p key={day.day+index} onClick={()=>{
                  setSelected({
                    date:day.day,
                    month:currentMonth,
                    year:currentYear,
                    day:day.dayOfWeek,
                  });
                  showSelf?.setIsActive(true);
                }} className={` ${selected.date===day.day?"bg-indigo-700":"bg-gray-100"} ${day.isActive===true?"border-b-indigo-700 border-b-4":"border-b-gray-100"}  text-sm text-center cursor-pointer text-black font-semibold  mx-auto w-[30px] h-[30px] p-2 flex items-center justify-center rounded-full`}>
                  {day.day}
                </p>
              )
            )}
          </div>
          <div className={`mt-5 p-3 flex items-center justify-end sm:hidden`}>
            <button onClick={()=>{
              addModal?.setIsActive(true)
            }} className="py-1 px-2 bg-slate-900 text-white font-semibold rounded-md">
              <p>Add Event</p>
            </button>
          </div>
        </div>
      </div>
      <EventsView date={selected.date} month={selected.month} year={selected.year} day={selected.day}/>
    </main>
  );
}


