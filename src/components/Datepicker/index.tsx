import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { IDate, IDatepickerProps } from "../../interface";
import DatepickerTime from "./Time";
import DatepickerHeader from "./Header";
import DatepickerCalendar from "./Calendar";
import DatepickerFooter from "./Footer";

const Datepicker: React.FC<IDatepickerProps> = ({
  width,
  onChange,
  value,
  disabled = false,
  min = null,
  max = null,
}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();
  const [dateObj, setDateObj] = useState<IDate>({
    date: value ? new Date(value).getDate() : currentDate,
    month: value ? new Date(value).getMonth() : currentMonth,
    year: value ? new Date(value).getFullYear() : currentYear,
    hours: value ? new Date(value).getHours() : 0,
    minutes: value ? new Date(value).getMinutes() : 0,
  });
  const [finalObj, setFinalDateObj] = useState<IDate | null>(
    value
      ? {
          date: value ? new Date(value).getDate() : currentDate,
          month: value ? new Date(value).getMonth() : currentMonth,
          year: value ? new Date(value).getFullYear() : currentYear,
          hours: value ? new Date(value).getHours() : 0,
          minutes: value ? new Date(value).getMinutes() : 0,
        }
      : null
  );
  const currentDateObj = useRef<IDate>({
    date: currentDate,
    month: currentMonth,
    year: currentYear,
    hours: currentHour,
    minutes: currentMinute,
  });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    if (disabled) {
      return;
    }
    const handleClickOutside = (event: Event) => {
      if (inputRef.current && inputRef.current.contains(event.target as Node)) {
        setOpen(!open);
      }
      if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(!open);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setOpen, open, disabled]);

  useEffect(() => {
    if (!value) {
      setFinalDateObj(null);
    }
  }, [value]);

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
      date,
      month,
      year,
    }));
  };

  const onTimeClickHour = (hours: number) => {
    setDateObj((prevState) => ({ ...prevState, hours }));
  };

  const onTimeClickMinute = (minutes: number) => {
    setDateObj((prevState) => ({ ...prevState, minutes }));
  };

  const handleConfirm = () => {
    // if (!value) {
    //   console.log("got null");
    // }
    if (min && new Date(`${dateObj.year}-${dateObj.month + 1}-${dateObj.date}`) < min) {
      setFinalDateObj(null);
    }
    if (max && new Date(`${dateObj.year}-${dateObj.month + 1}-${dateObj.date}`) > max) {
      setFinalDateObj(null);
    } else {
      setFinalDateObj(dateObj);
    }
    onChange(new Date(dateObj.year, dateObj.month, dateObj.date, dateObj.hours, dateObj.minutes));
    setOpen(false);
    console.log(value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="datepicker">
      <input
        style={{
          width,
          backgroundColor: disabled ? "#FAFAFA" : "#fff",
          cursor: disabled ? "default" : "pointer",
        }}
        ref={inputRef}
        type="text"
        className="datepicker_input"
        value={
          finalObj
            ? `${finalObj.year}/${String(finalObj.month + 1).padStart(2, "0")}/${String(
                finalObj.date
              ).padStart(2, "0")} ${String(finalObj.hours).padStart(2, "0")}:${String(
                finalObj.minutes
              ).padStart(2, "0")}`
            : ""
        }
        placeholder="Select a date"
        readOnly
      />
      {open ? (
        <div className="datepicker_modal" ref={menuRef}>
          <DatepickerHeader selected={dateObj} onNext={onNext} onPrev={onPrev} />
          <DatepickerCalendar
            onDateClick={onDateClick}
            dateObj={dateObj}
            currentDateObj={currentDateObj}
            min={min}
            max={max}
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
