import React, { useState, useEffect, useRef } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { it } from "date-fns/locale";

function DateFilter({ selectedDate, handleDateChange }) {
  const [dates, setDates] = useState([]);
  const containerRef = useRef(null); // useRef per ottenere il riferimento al contenitore
  const today = startOfDay(new Date());

  useEffect(() => {
    const newDates = Array.from({ length: 201 }, (_, index) =>
      format(addDays(new Date(selectedDate), index - 101), "yyyy-MM-dd")
    );
    setDates(newDates);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      const selectedIndex = children.findIndex(
        (child) => child.value === format(new Date(selectedDate), "yyyy-MM-dd")
      );
      if (selectedIndex >= 0) {
        const selectedElement = children[selectedIndex];
        containerRef.current.scrollLeft =
          selectedElement.offsetLeft -
          containerRef.current.offsetWidth / 2 +
          selectedElement.offsetWidth / 2;
      }
    }
  }, [selectedDate, dates]);

  const isSelectedDate = (date) => {
    return format(new Date(selectedDate), "yyyy-MM-dd") === date;
  };

  const handleDateClick = (date) => {
    handleDateChange(date);
  };

  const scrollableStyle = {
    display: "flex",
    justifyContent: "center",
    overflowX: "scroll",
    whiteSpace: "nowrap",

    // scrollbarWidth: "none",
    // msOverflowStyle: "none",
  };

  return (
    <div ref={containerRef} style={scrollableStyle} className=" bg-slate-100 ">
      {dates.map((date) => (
        <button
          key={date}
          value={date}
          onClick={() => handleDateClick(date)}
          disabled={isBefore(new Date(date), today)}
          className={`m-0 p-3  font-semibold text-sm lg:text-xl ${
            isBefore(new Date(date), today)
              ? "bg-gray-200 text-gray-300 border-x-2 border-x-white"
              : "text-gray-500"
          } text-regular border-1 ${
            isSelectedDate(date)
              ? "border-x-2 border-x-white bg-rose-600 text-white text-bold"
              : "border-l-slate-200"
          }`}
        >
          {format(new Date(date), "d MMM", { locale: it })}
          <br />
          {format(new Date(date), "EEE", { locale: it })}
        </button>
      ))}
    </div>
  );
}

export default DateFilter;
