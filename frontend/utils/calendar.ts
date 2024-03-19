import { apiEndpoint } from "@/components/endpoints";
import dayjs from "dayjs";

export async function getDaysInMonth(month = dayjs().month(), year = dayjs().year()) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const dateArray = [];
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const day = firstDay.getDay();

  const events = await getEvents();

  for (let x = day; x > 0; x--) {
    dateArray.push({day:prevDays-x+1,isPrev:true,isNext:false,isActive:false,dayOfWeek:x})
  }

  for (
    let index = firstDay.getDate();
    index <= lastDay.getDate();
    index++
  ) {
    let eve = false;
    events.forEach((event:any,i:number) => {
      if(event.day ===index&&event.month===month+1 && event.year===year){
        eve = true;
      }
    });
    if(eve){
      dateArray.push({day:index,isPrev:false,isNext:false,isActive:true,dayOfWeek:new Date(year,month+1,index).getDay()});
    }else{
      dateArray.push({day:index,isPrev:false,isNext:false,isActive:false,dayOfWeek:new Date(year,month+1,index).getDay()});
    }
    eve =false;
  }

  for (let x = 1; x < (7-lastDay.getDay()); x++) {
    dateArray.push({day:x,isNext:true,isPrev:false,isActive:false,dayOfWeek:dayjs().year(month===11?year:year+1).month(month).day()})
  }
  return dateArray;
}

async function getEvents() {
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
      let arr = events;
      return(arr)
    } else {
      getEvents();
    }
  } catch (error) {
    console.error(error);
  }
}