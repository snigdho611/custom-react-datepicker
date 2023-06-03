import { useRef, useState } from "react";
import "./index.scss";
import DatepickerTime from "./Time";
import DatepickerHeader from "./Header";
import DatepickerCalendar from "./Calendar";
import DatepickerFooter from "./Footer";
import { IDate } from "interface";

const Datepicker = () => {
  const [dateObj, setDateObj] = useState<IDate>({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const currentDateObj = useRef<IDate>({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  const onNext = () => {
    if (dateObj.month === 12) {
      return setDateObj((prevState) => ({
        ...prevState,
        date: 1,
        month: 1,
        year: dateObj.year + 1,
      }));
    }

    return setDateObj((prevState) => ({
      ...prevState,
      date: 1,
      month: dateObj.month + 1,
    }));
  };

  const onPrev = () => {
    if (dateObj.month === 1) {
      return setDateObj((prevState) => ({
        ...prevState,
        date: 1,
        month: 12,
        year: dateObj.year - 1,
      }));
    }

    return setDateObj((prevState) => ({
      ...prevState,
      date: 1,
      month: dateObj.month - 1,
    }));
  };

  const onDateClick = (date: number, month: number, year: number) => {
    setDateObj((prevState) => ({ ...prevState, date: date, month: month, year: year }));
  };

  const onTimeClickHour = (hours: number) => {
    setDateObj((prevState) => ({ ...prevState, hours: hours }));
  };

  const onTimeClickMinute = (minutes: number) => {
    setDateObj((prevState) => ({ ...prevState, minutes: minutes }));
  };

  return (
    <div className="datepicker">
      <DatepickerHeader dateObj={dateObj} onNext={onNext} onPrev={onPrev} />
      <DatepickerCalendar
        onDateClick={onDateClick}
        dateObj={dateObj}
        currentDateObj={currentDateObj}
      />
      <DatepickerTime
        onTimeClickHour={onTimeClickHour}
        onTimeClickMinute={onTimeClickMinute}
        dateObj={dateObj}
      />
      <DatepickerFooter dateObj={dateObj} />
    </div>
  );
};

export default Datepicker;
