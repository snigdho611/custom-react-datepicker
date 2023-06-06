import { useEffect, useRef, useState } from "react";
import "./index.scss";
import DatepickerTime from "./Time";
import DatepickerHeader from "./Header";
import DatepickerCalendar from "./Calendar";
import DatepickerFooter from "./Footer";
import { IDate, IDatepickerProps } from "interface";

const Datepicker: React.FC<IDatepickerProps> = ({ width = "100%", onChange, date }) => {
  const [dateObj, setDateObj] = useState<IDate>({
    date: date ? new Date(date).getDate() : new Date().getDate(),
    month: date ? new Date(date).getMonth() : new Date().getMonth(),
    year: date ? new Date(date).getFullYear() : new Date().getFullYear(),
    hours: date ? new Date(date).getHours() : new Date().getHours(),
    minutes: date ? new Date(date).getMinutes() : new Date().getMinutes(),
  });
  const [finalObj, setFinalDateObj] = useState<IDate>({
    date: date ? new Date(date).getDate() : new Date().getDate(),
    month: date ? new Date(date).getMonth() : new Date().getMonth(),
    year: date ? new Date(date).getFullYear() : new Date().getFullYear(),
    hours: date ? new Date(date).getHours() : new Date().getHours(),
    minutes: date ? new Date(date).getMinutes() : new Date().getMinutes(),
  });
  const currentDateObj = useRef<IDate>({
    date: date ? new Date(date).getDate() : new Date().getDate(),
    month: date ? new Date(date).getMonth() : new Date().getMonth(),
    year: date ? new Date(date).getFullYear() : new Date().getFullYear(),
    hours: date ? new Date(date).getHours() : new Date().getHours(),
    minutes: date ? new Date(date).getMinutes() : new Date().getMinutes(),
  });
  const menuRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(()=>{
    onChange(new Date(finalObj.year, finalObj.month, finalObj.date, finalObj.hours, finalObj.minutes))
  }, [finalObj, onChange])

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (inputRef.current && inputRef.current.contains(event.target)) {
        setOpen(!open);
      }
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(!open);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setOpen, open]);

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
    setDateObj((prevState) => ({
      ...prevState,
      date: date,
      month: month,
      year: year,
    }));
  };

  const onTimeClickHour = (hours: number) => {
    setDateObj((prevState) => ({ ...prevState, hours: hours }));
  };

  const onTimeClickMinute = (minutes: number) => {
    setDateObj((prevState) => ({ ...prevState, minutes: minutes }));
  };

  const handleConfirm = () => {
    setFinalDateObj(dateObj);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="datepicker">
      <input
        style={{ width: width }}
        ref={inputRef}
        type="text"
        className="datepicker_input"
        value={`${finalObj.year}/${String(finalObj.month + 1).padStart(2, "0")}/${String(
          finalObj.date
        ).padStart(2, "0")} ${String(finalObj.hours).padStart(2, "0")}:${String(
          finalObj.minutes
        ).padStart(2, "0")}`}
        readOnly
      />
      {open ? (
        <div className="datepicker_modal" style={{ width: width }} ref={menuRef}>
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
    </div>
  );
};

export default Datepicker;
