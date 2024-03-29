"use client";
import React, { useContext, useState } from "react";
import { AddContext } from "./contexts/AddEventModalContext";
import { IsNewContext } from "./contexts/IsNewContext";
import { apiEndpoint } from "./endpoints";

type Props = {};

const AddEvent = (props: Props) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const addModal = useContext(AddContext);
  const isNewContext = useContext(IsNewContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      title: data.title,
      description: data.description,
      day: parseInt(data.date.split("-")[2]),
      month: parseInt(data.date.split("-")[1]),
      year: parseInt(data.date.split("-")[0]),
    };
    try {
      const res = await fetch(apiEndpoint+"/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const { message, success } = await res.json();
      if (success) {
        setData({
          title: "",
          description: "",
          date: "",
        });
        addModal?.setIsActive(false);
        isNewContext?.setIsNew(true);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div
      className={` ${
        addModal?.isActive ? "" : "hidden"
      } absolute top-0 left-0 w-full h-full bg-slate-950/75 flex items-center justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        className="p-2 bg-slate-900 rounded-md max-w-[400px] w-full grid gap-3"
      >
        <div>
          <h2 className="text-white text-center font-bold text-2xl tracking-wider">
            Create an Event
          </h2>
        </div>
        <div>
          <input
            required
            type="text"
            name="title"
            placeholder="Event Title"
            className="w-full py-1 px-2 text-white bg-slate-900 border-2 border-gray-500 rounded-md"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                title: e.target?.value,
              }));
            }}
          />
        </div>
        <div>
          <textarea
            name="description"
            cols={30}
            rows={10}
            placeholder="Event Description"
            className="bg-slate-900 py-1 px-2 text-white w-full resize-none border-2 border-gray-500 rounded-md"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                description: e.target?.value,
              }));
            }}
          ></textarea>
        </div>
        <div>
          <input
            required
            type="date"
            name="date"
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                date: e.target?.value,
              }));
            }}
            className="bg-slate-900 py-1 text-white px-2 w-full resize-none border-2 border-gray-500 rounded-md"
          />
        </div>
        <div className=" flex items-center justify-end gap-5">
          <input
            type="submit"
            value="Submit"
            className="p-2 py-1 bg-green-600 rounded-md text-white font-semibold cursor-pointer"
          />
          <div
            onClick={() => {
              setData({
                title: "",
                description: "",
                date: "",
              });
              addModal?.setIsActive(false);
            }}
            className="p-2 py-1 bg-red-600 rounded-md text-white font-semibold select-none cursor-pointer"
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddEvent;
