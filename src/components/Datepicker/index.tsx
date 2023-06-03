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
  const [finalObj, setFinalDateObj] = useState<IDate>({
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
  console.log(dateObj);

  const onNext = () => {
    if (dateObj.month === 11) {
      return setDateObj((prevState) => ({
        ...prevState,
        date: 1,
        month: 0,
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
    if (dateObj.year === 1970 && dateObj.month === 0) {
      return;
    }
    if (dateObj.month === 0) {
      return setDateObj((prevState) => ({
        ...prevState,
        date: 1,
        month: 11,
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

  const [open, setOpen] = useState<boolean>(false);

  const handleConfirm = () => {
    setFinalDateObj(dateObj);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {/* {dateObj.year}/{dateObj.month + 1}/{dateObj.date} {dateObj.hours}:{dateObj.minutes}{" "} */}
      <input
        type="text"
        className="_input"
        onClick={() => {
          setOpen(!open);
        }}
        value={`${finalObj.year}/${finalObj.month + 1}/${finalObj.date}  ${finalObj.hours}:${
          finalObj.minutes
        }`}
        // disabled
        readOnly
      />
      {open ? (
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
          <DatepickerFooter
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
            dateObj={dateObj}
          />
        </div>
      ) : null}
    </>
  );
};

export default Datepicker;
