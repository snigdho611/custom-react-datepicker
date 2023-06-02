import React, { useState } from "react";
import "./index.scss";

interface IDatepickerHeaderProps{
    month: number;
}

const DatepickerHeader:React.FC<IDatepickerHeaderProps> = ({month}) => {
  return (
    <div className="datepicker_header">
      <div>{"<"}</div>
      <div>{month}</div>
      <div>{">"}</div>
    </div>
  );
};

const Datepicker = ({ year=2023, month=5 }) => {
//     const [month, setMonth] = useState<number>(0)
//   return (
//     <div className="datepicker">
//       <DatepickerHeader month={month} />
//     </div>
//   );
const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  console.log(startDay)

  const calendarDays = [];

  // Fill the previous month's days
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div className="calendar-day empty"></div>);
  }

  // Fill the current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const isCurrentDay = i === currentDate.getDate();
    const dayClass = isCurrentDay ? 'calendar-day current-day' : 'calendar-day';
    calendarDays.push(<div className={dayClass}>{i}</div>);
  }

  // Render the calendar component
  return (
    <div className="calendar">
      <div className="calendar-header">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
      <div className="calendar-days">
        <div className="calendar-day">Sun</div>
        <div className="calendar-day">Mon</div>
        <div className="calendar-day">Tue</div>
        <div className="calendar-day">Wed</div>
        <div className="calendar-day">Thu</div>
        <div className="calendar-day">Fri</div>
        <div className="calendar-day">Sat</div>
      </div>
      <div className="calendar-grid">{calendarDays}</div>
    </div>
  );
};

export default Datepicker;
