import React, { useState, useEffect } from "react";
import "material-icons/iconfont/material-icons.css";
import "./index.css";
import { MONTH_NAMES, WEEK_DAYS } from "./Utils/Utility";

const App = () => {
  const [currYear, setCurrYear] = useState();
  const [currMonth, setCurrMonth] = useState();

  const renderCalendar = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    const lastDayOfMonth = new Date(
      currYear,
      currMonth,
      lastDateOfMonth
    ).getDay();

    let liElements = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      liElements.push(
        <li
          key={`inactive-${lastDateOfLastMonth - i + 1}`}
          className="inactive"
        >
          {lastDateOfLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === currentDate.getDate() &&
        currMonth === currentDate.getMonth() &&
        currYear === currentDate.getFullYear();
      liElements.push(
        <li key={`active-${i}`} className={isToday ? "active" : ""}>
          {i}
        </li>
      );
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      liElements.push(
        <li key={`inactive-${i - lastDayOfMonth + 1}`} className="inactive">
          {i - lastDayOfMonth + 1}
        </li>
      );
    }

    return (
      <>
        <ul className="days">{liElements}</ul>
      </>
    );
  };

  const handleIconClick = (isPrev) => {
    setCurrMonth((prevMonth) =>
      isPrev
        ? prevMonth === 0
          ? 11
          : prevMonth - 1
        : prevMonth === 11
        ? 0
        : prevMonth + 1
    );

    setCurrYear((prevYear) => {
      if ((currMonth === 0 && isPrev) || (currMonth === 11 && !isPrev)) {
        return isPrev ? prevYear - 1 : prevYear + 1;
      }
      return prevYear;
    });
  };
  useEffect(() => {
    const currentDate = new Date();
    setCurrMonth(currentDate.getMonth());
    setCurrYear(currentDate.getFullYear());
  }, []);
  useEffect(() => {
    if (currYear && currMonth) renderCalendar();
  }, [currYear, currMonth]);

  return (
    <>
      <div className="wrapper">
        <header>
          <p className="current-date">{`${MONTH_NAMES[currMonth]} ${currYear}`}</p>
          <div className="icons">
            <span
              id="prev"
              className="material-symbols-rounded"
              onClick={() => handleIconClick(true)}
            >
              <i className="material-icons">chevron_left</i>
            </span>
            <span
              id="next"
              className="material-symbols-rounded"
              onClick={() => handleIconClick(false)}
            >
              <i className="material-icons">chevron_right</i>
            </span>
          </div>
        </header>
        <div className="calendar">
          <ul className="weeks">
            {WEEK_DAYS.map((day, i) => (
              <li key={i}>{day}</li>
            ))}
          </ul>
          <ul className="days">{renderCalendar()}</ul>
        </div>
      </div>
    </>
  );
};

export default App;
