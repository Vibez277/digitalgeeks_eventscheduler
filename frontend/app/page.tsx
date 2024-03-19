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
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-5 bg-[#efefef]">
      <h1 className='text-3xl font-bold py-5'>DigitalGeeksz Events</h1>
      <div className="w-screen flex items-center justify-center flex-col gap-5">
        <a className="border-2 border-gray-600 bg-slate-900 text-white font-semibold rounded-md px-2 py-1" href="/auth/signin">Sign In</a>
        <a className="border-2 border-gray-600 bg-slate-900 text-white font-semibold rounded-md px-2 py-1" href="/auth/signup">Sign Up</a>
      </div>
    </main>
  );
}


