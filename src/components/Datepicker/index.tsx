import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { IDate, IDatepickerProps } from "../../interface";
import Time from "./Time";
import Calendar from "./Calendar";
import Header from "./Header";
import Footer from "./Footer";

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

  const [menuDisplayDate, setMenuDisplayDate] = useState<IDate>({
    date: value ? new Date(value).getDate() : currentDate,
    month: value ? new Date(value).getMonth() : currentMonth,
    year: value ? new Date(value).getFullYear() : currentYear,
    hours: value ? new Date(value).getHours() : 0,
    minutes: value ? new Date(value).getMinutes() : 0,
  });
  const [selectedDate, setSelectedDate] = useState<IDate | null>(
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
    seconds: currentSeconds,
  });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    if (disabled) {
      return;
    }
    const inputElement = inputRef.current;
    const handleSpacebar = (event: KeyboardEvent) => {
      if (
        inputRef.current &&
        inputRef.current.contains(event.target as Node) &&
        event.code === "Space"
      ) {
        console.log("Keyboard event detected, open or close menu");
        setOpen(!open);
      }
    };

    const handleClickOutside = (event: Event) => {
      if (inputRef.current && inputRef.current.contains(event.target as Node)) {
        console.log("Mouse event detected, open or close menu");
        setOpen(!open);
      }
      if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        console.log("Mouse event detected, close menu");
        setOpen(false);
      }
    };

    inputElement && inputElement.addEventListener("keydown", handleSpacebar);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      inputElement && inputElement.removeEventListener("keydown", handleSpacebar);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, disabled]);

  useEffect(() => {
    if (!value) {
      setSelectedDate(null);
    }
  }, [value]);

  const onNext = () => {
    if (menuDisplayDate.month === 11) {
      return setMenuDisplayDate((prevState) => ({
        ...prevState,
        date: 1,
        month: 0,
        year: menuDisplayDate.year + 1,
      }));
    }

    return setMenuDisplayDate((prevState) => ({
      ...prevState,
      date: 1,
      month: menuDisplayDate.month + 1,
    }));
  };

  const onPrev = () => {
    if (menuDisplayDate.year === 1970 && menuDisplayDate.month === 0) {
      return;
    }
    if (menuDisplayDate.month === 0) {
      return setMenuDisplayDate((prevState) => ({
        ...prevState,
        date: 1,
        month: 11,
        year: menuDisplayDate.year - 1,
      }));
    }

    return setMenuDisplayDate((prevState) => ({
      ...prevState,
      date: 1,
      month: menuDisplayDate.month - 1,
    }));
  };

  const onDateClick = (date: number, month: number, year: number) => {
    setMenuDisplayDate((prevState) => ({
      ...prevState,
      date,
      month,
      year,
    }));
  };

  const onTimeClickHour = (hours: number) => {
    setMenuDisplayDate((prevState) => ({ ...prevState, hours }));
  };

  const onTimeClickMinute = (minutes: number) => {
    setMenuDisplayDate((prevState) => ({ ...prevState, minutes }));
  };

  const handleConfirm = () => {
    if (
      min &&
      new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${menuDisplayDate.date}`) < min
    ) {
      setSelectedDate(null);
    }
    if (
      max &&
      new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${menuDisplayDate.date}`) > max
    ) {
      setSelectedDate(null);
    } else {
      setSelectedDate(menuDisplayDate);
    }
    onChange(
      new Date(
        menuDisplayDate.year,
        menuDisplayDate.month,
        menuDisplayDate.date,
        menuDisplayDate.hours,
        menuDisplayDate.minutes
      )
    );
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
          selectedDate
            ? `${selectedDate.year}/${String(selectedDate.month + 1).padStart(2, "0")}/${String(
                selectedDate.date
              ).padStart(2, "0")} ${String(selectedDate.hours).padStart(2, "0")}:${String(
                selectedDate.minutes
              ).padStart(2, "0")}`
            : ""
        }
        placeholder="Select a date"
        readOnly
      />

      {open ? (
        <div className="datepicker_modal" ref={menuRef}>
          <Header
            selected={menuDisplayDate}
            onNext={onNext}
            onPrev={onPrev}
            handleCancel={handleCancel}
          />
          <Calendar
            onDateClick={onDateClick}
            menuDisplayDate={menuDisplayDate}
            currentDateObj={currentDateObj}
            min={min}
            max={max}
          />
          <Time
            onTimeClickHour={onTimeClickHour}
            onTimeClickMinute={onTimeClickMinute}
            selected={menuDisplayDate}
            min={min}
            max={max}
          />
          <Footer handleConfirm={handleConfirm} menuDisplayDate={menuDisplayDate} />
        </div>
      ) : null}
    </div>
  );
};

export default Datepicker;
