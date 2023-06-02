import React, { useState } from "react";
import "./index.scss";
import dayjs from "dayjs";

interface IDate {
  date: number;
  month: number;
  year: number;
}
interface IDatepickerHeaderProps {
  dateObj: IDate;
  onNext: () => void;
  onPrev: () => void;
}

interface IDatepickerBodyProps {
  dateObj: IDate;
}

const DatepickerHeader: React.FC<IDatepickerHeaderProps> = ({
  dateObj,
  onNext,
  onPrev,
}) => {
  //   console.log(dayjs().month(dateObj.month - 1));
  return (
    <div className="datepicker_header">
      <div onClick={onPrev}>{"<"}</div>
      <div>
        {dayjs()
          .locale("en")
          .month(dateObj.month - 1)
          .format("MMMM")}{" "}
        {dateObj.year}
      </div>
      <div onClick={onNext}>{">"}</div>
    </div>
  );
};

const DatepickerBody: React.FC<IDatepickerBodyProps> = ({ dateObj }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const calendarDays = [];

  //   for (let i = 0; i < startDay; i++) {
  //     calendarDays.push(<div className="calendar-day empty"></div>);
  //   }

  //   for (let i = 1; i <= daysInMonth; i++) {
  //     const isCurrentDay = i === currentDate.getDate();
  //     const dayClass = isCurrentDay ? "calendar-day current-day" : "calendar-day";
  //     calendarDays.push(<div className={dayClass}>{i}</div>);
  //   }

    const getEmptyCells = () => {
        const emptyCells = []
        for (let i = 0; i < startDay; i++) {
            emptyCells.push(<div className="datepicker_calendar_date_day-empty"/>)
        }
        return emptyCells
    }


  return (
    <div className="datepicker_calendar">
      <div className="datepicker_calendar_week">
        <div className="datepicker_calendar_week_day">Mon</div>
        <div className="datepicker_calendar_week_day">Tue</div>
        <div className="datepicker_calendar_week_day">Wed</div>
        <div className="datepicker_calendar_week_day">Thu</div>
        <div className="datepicker_calendar_week_day">Fri</div>
        <div className="datepicker_calendar_week_day">Sat</div>
        <div className="datepicker_calendar_week_day">Sun</div>
      </div>
      <div className="datepicker_calendar_date">
        {getEmptyCells()}
      </div>
      {/* <div className="calendar-grid">{calendarDays}</div> */}
    </div>
  );
};

const Datepicker = () => {
  const [dateObj, setDateObj] = useState<IDate>({
    date: 1,
    month: 1,
    year: 2023,
  });

  const getLastDayOfMonth = (year: number, month: number) => {
    const nextMonth: any = new Date(year, month + 1, 1);

    const lastDayOfMonth = new Date(nextMonth - 1);

    return lastDayOfMonth.getDate();
  };

  const onNext = () => {
    if (dateObj.month === 12) {
      console.log("Go to next year");
      return setDateObj((prevState) => ({
        ...prevState,
        date: 1,
        month: 1,
        year: dateObj.year + 1,
      }));
    }

    return setDateObj((prevState) => ({
      ...prevState,
      month: dateObj.month + 1,
    }));
  };

  const onPrev = () => {
    if (dateObj.month === 1) {
      console.log("Go to previous year");
      return setDateObj((prevState) => ({
        ...prevState,
        date: 1,
        month: 12,
        year: dateObj.year - 1,
      }));
    }

    return setDateObj((prevState) => ({
      ...prevState,
      month: dateObj.month - 1,
    }));
  };

  return (
    <div className="datepicker">
      <DatepickerHeader dateObj={dateObj} onNext={onNext} onPrev={onPrev} />
      <DatepickerBody dateObj={dateObj} />
    </div>
  );
};

export default Datepicker;
