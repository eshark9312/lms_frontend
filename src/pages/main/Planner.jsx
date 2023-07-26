import React, { useEffect, useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getWeek,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns";

import Header from "../../components/main/planner/header";
import DayView from "../../components/main/planner/dayView";
import WeekView from "../../components/main/planner/weekView";
import MonthView from "../../components/main/planner/monthView";

function PlannerPage() {
  const [view, setView] = useState("Day view");
  const [today, setToday] = useState(startOfToday());
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(
    parse(currentMonth, "MMM-yyyy", new Date())
  );
  const [days, setDays] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(
    eachDayOfInterval({
      start: startOfWeek(selectedDay),
      end: endOfWeek(selectedDay),
    })
  );
  const events = [
    {
      type: "matiere",
      id: 12,
      title: "Cardiologie",
      date: "2023-07-25",
      from: "17:00",
      to: "18:00",
      desc: "",
    },
    {
      type: "matiere",
      id: 14,
      title: "Pneumologie",
      date: "2023-07-25",
      from: "13:00",
      to: "16:00",
      desc: "",
    },
    {
      type: "item",
      id: 1,
      title: "188. Endocardite infectieuse",
      date: "2023-07-25",
      from: "9:00",
      to: "10:00",
      desc: "here some description you added",
    },
    {
      type: "item",
      id: 2,
      title: "152. Endocardite infectieuse",
      date: "2023-07-25",
      from: "10:00",
      to: "11:00",
      desc: "",
    },
    {
      type: "DP",
      id: 12,
      title: "DP 2",
      date: "2023-07-26",
      from: "17:00",
      to: "18:00",
      desc: "here some description you added",
    },
    {
      type: "question",
      id: 12,
      title: "#3066",
      date: "2023-07-26",
      from: "18:00",
      to: "19:00",
      desc: "",
    },
  ];
  const addEvent = () => {};

  const goToToday = () => {};

  const next = () => {
    switch (view) {
      case "dayView":
        nextDay();
        break;
      case "weekview":
        nextWeek();
        break;
      case "monthView":
        nextMonth();
        break;
      default:
        break;
    }
  };
  const previous = () => {
    switch (view) {
      case "dayView":
        previousDay();
        break;
      case "weekview":
        previousWeek();
        break;
      case "monthView":
        previousMonth();
        break;
      default:
        break;
    }
  };
  const previousDay = () => {};

  const nextDay = () => {};

  const previousWeek = () => {};

  const nextWeek = () => {};

  const previousMonth = () => {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
    setFirstDayCurrentMonth(firstDayPreviousMonth);
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setFirstDayCurrentMonth(firstDayNextMonth);
  };
  useEffect(() => {
    setSelectedWeek(
      eachDayOfInterval({
        start: startOfWeek(selectedDay),
        end: endOfWeek(selectedDay),
      })
    );
  }, [selectedDay]);

  useEffect(() => {
    const _days_ = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    }).map((date) => ({
      date: date,
      isCurrentMonth: true,
      isToday: isEqual(today, date),
      isSelected: isEqual(selectedDay, date),
    }));
    for (let i = 1; i < getDay(firstDayCurrentMonth) + 1; i++)
      _days_.unshift({
        date: add(firstDayCurrentMonth, { days: -i }),
        isCurrentMonth: false,
      });
    for (let i = 1; i < 7 - getDay(endOfMonth(firstDayCurrentMonth)); i++)
      _days_.push({
        date: add(endOfMonth(firstDayCurrentMonth), { days: i }),
        isCurrentMonth: false,
      });
    setDays(() => _days_);
    console.log(today, firstDayCurrentMonth, selectedDay);
  }, [today, firstDayCurrentMonth, selectedDay]);

  return (
    <div className="-mx-4 -mt-24 -mb-10 pt-16 sm:-mx-6 px-2 sm:px-6 pb-8 lg:-mt-10 lg:px-8 lg:-mx-8 lg:pt-4 h-screen bg-gray-50 ">
      <div className="flex h-full flex-col">
        <Header
          title={format(today, "MMMM yyyy")}
          view={view}
          setView={setView}
          addEvent={addEvent}
          control={{ goToToday, previous, next }}
        />
        {view === "Day view" && (
          <DayView
            days={days}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            events={events}
          />
        )}
        {view === "Week view" && <WeekView />}
        {view === "Month view" && <MonthView />}
      </div>
    </div>
  );
}

export default PlannerPage;
