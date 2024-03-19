"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { AddContext } from "./contexts/AddEventModalContext";
import { ShowContext } from "./contexts/ShowEventsContext";
import { FaX } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IsNewContext } from "./contexts/IsNewContext";
import { EditContext } from "./contexts/EditEventModalContext";
import { apiEndpoint } from "./endpoints";

type Props = {
  date?: number;
  month?: number;
  year?: number;
  day?: number;
};
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
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
type event = {
  id:string
  title: string;
  description: string;
  day: number;
  month: number;
  year: number;
};

const EventsView = (props: Props) => {
  const addModal = useContext(AddContext);
  const showSelf = useContext(ShowContext);
  const isNewContext = useContext(IsNewContext);
  const editContext = useContext(EditContext);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<event[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getEvents() {
      setLoading(true);
      try {
        const res = await fetch(apiEndpoint+"/api/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const { message, success, events } = await res.json();
        if (success) {
            if(events.length<=0){
                setEvents(events);
                setLoading(false);
                isNewContext?.setIsNew(false);
                return;
            }
            const arr:event[] = [];
            events.forEach((event:event) => {
                if(props.date===event.day&&(props.month as number+1)===event.month&&props.year===event.year){
                  arr.push(event);
                }
            });
          setEvents(arr);
          setLoading(false);
          isNewContext?.setIsNew(false);
        } else {
          alert(message);
          getEvents();
        }
      } catch (error) {
        console.error(error);
      }
    }
    getEvents();
  }, [props.day,isNewContext?.isNew===true]);

  function EventCard({ event }: { event: event }) {
    async function handleDelete(id:string){
      try {
        const res = await fetch(apiEndpoint+"/api/delete-event/"+id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const { message, success } = await res.json();
        if (success) {
                alert(message);
                isNewContext?.setIsNew(true);
        } else {
          alert(message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return (
      <div className=" w-full flex items-center gap-3">
        <div className="border-2 border-gray-600 p-2 rounded-md flex-grow select-none cursor-pointer hover:scale-[1.02] transition-transform">
        <h2 className="font-semibold tracking-wider">{event.title}</h2>
        <p className="text-sm line-clamp-2 text-gray-300">{event.description}</p>
        <p className="text-xs text-gray-500 text-right font-semibold">
          {event.day < 10 ? `0${event.day}` : event.day}-
          {event.month < 10 ? `0${event.month}` : event.month}-{event.year}
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FaEdit size={24} onClick={()=>{
          editContext?.setEventId(event.id);
          editContext?.setIsActive(true);
        }}/>
        <FaTrash onClick={()=>handleDelete(event.id)} size={24} className="text-red-600"/>
      </div>
      </div>
    );
  }

  return (
    <div
      className={`show lg:max-w-[500px] sm:max-w-[400px] w-full text-white bg-slate-900 flex-grow h-[100vh] flex flex-col items-center p-10 fixed sm:relative ${
        showSelf?.isActive
          ? " translate-x-0"
          : "translate-x-full sm:translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="w-max font-bold text-2xl underline underline-offset-4 mb-5">
          Events
        </h2>
        <button
          onClick={() => {
            showSelf?.setIsActive(false);
          }}
          className={`border-2 border-gray-600 p-2 rounded-full hover:border-white transition-all hover:scale-105 bg-slate-900 ${
            showSelf?.isActive ? "block sm:hidden" : "block sm:hidden"
          }`}
        >
          <FaX />
        </button>
      </div>
      <h4 className=" capitalize font-semibold text-xl border-b-2 border-dotted mb-5">
        {daysOfWeek[props.day as number]} {props.date}{" "}
        {months[props.month as number]} {props.year}
      </h4>

      <div className="flex flex-col items-center gap-3 w-full">
        {loading ? (
          <div>Loading ...</div>
        ) : events.length <= 0 ? (
          <div className="flex flex-col items-center gap-3">
            <h3>No Events Found</h3>
            <button
              onClick={() => {
                addModal?.setIsActive(!addModal.isActive);
              }}
              className=" border-2 border-gray-600 p-2 rounded-md hover:border-white transition-all hover:scale-105 bg-slate-900"
            >
              Create one?
            </button>
          </div>
        ) : (
          events.map((event, index) => (
              <EventCard event={event} key={index} />
            )
          )
        )}
      </div>
      <button
        onClick={() => {
          addModal?.setIsActive(!addModal.isActive);
        }}
        className="absolute z-30 bottom-10 right-8 border-2 border-gray-600 p-2 rounded-full hover:border-white transition-all hover:scale-105 bg-slate-900"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default EventsView;
