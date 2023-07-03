import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { IDate, IDatepickerProps } from "interface";
import Time from "components/Datepicker/Time";
import Calendar from "components/Datepicker/Calendar";
import Header from "components/Datepicker/Header";
import Footer from "components/Datepicker/Footer";

const Datepicker: React.FC<IDatepickerProps> = ({
  width,
  onChange,
  value,
  disabled = false,
  min = null,
  max = null,
  time = "false",
}) => {
  const current = {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  };

  const [menuDisplayDate, setMenuDisplayDate] = useState<IDate>({
    date: value ? new Date(value).getDate() : current.date,
    month: value ? new Date(value).getMonth() : current.month,
    year: value ? new Date(value).getFullYear() : current.year,
    hours: value ? new Date(value).getHours() : current.hours,
    minutes: value ? new Date(value).getMinutes() : current.minutes,
    seconds: value ? new Date(value).getSeconds() : current.seconds,
  });
  const [selectedDate, setSelectedDate] = useState<IDate | null>(
    value
      ? {
          date: value ? new Date(value).getDate() : current.date,
          month: value ? new Date(value).getMonth() : current.month,
          year: value ? new Date(value).getFullYear() : current.year,
          hours: value ? new Date(value).getHours() : current.hours,
          minutes: value ? new Date(value).getMinutes() : current.minutes,
          seconds: value ? new Date(value).getSeconds() : current.seconds,
        }
      : null
  );

  const [hoursRange, setHoursRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: 24,
  });
  const [minutesRange, setMinuteRange] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: 60,
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
        setOpen(!open);
      }
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    inputElement && inputElement.addEventListener("keydown", handleSpacebar);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      inputElement &&
        inputElement.removeEventListener("keydown", handleSpacebar);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, disabled]);

  useEffect(() => {
    if (value) {
      setSelectedDate({
        date: new Date(value).getDate(),
        month: new Date(value).getMonth(),
        year: new Date(value).getFullYear(),
        hours: new Date(value).getHours(),
        minutes: new Date(value).getMinutes(),
        seconds: new Date(value).getSeconds(),
      });
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const onDateClick = (
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    setMenuDisplayDate((prevState) => ({
      ...prevState,
      date,
      month,
      year,
      hours,
      minutes,
      seconds,
    }));
    if (min && max) {
      if (
        new Date(`${year}-${month + 1}-${date}`).getTime() ===
        new Date(
          `${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`
        ).getTime()
      ) {
        setHoursRange({ start: min.getHours(), end: 23 });
        setMinuteRange({ start: min.getMinutes(), end: 60 });
      } else if (
        new Date(`${year}-${month + 1}-${date}`).getTime() ===
        new Date(
          `${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`
        ).getTime()
      ) {
        setHoursRange({ start: 0, end: max.getHours() + 1 });
        setMinuteRange({ start: 0, end: max.getMinutes() });
      } else {
        setHoursRange({ start: 0, end: 24 });
        setMinuteRange({ start: 0, end: 60 });
      }
    } else if (min && !max) {
      if (
        new Date(`${year}-${month + 1}-${date}`).getTime() ===
        new Date(
          `${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`
        ).getTime()
      ) {
        setHoursRange({ start: min.getHours(), end: 23 });
        setMinuteRange({ start: min.getMinutes(), end: 60 });
      } else {
        setHoursRange({ start: 0, end: 24 });
        setMinuteRange({ start: 0, end: 60 });
      }
    } else if (!min && max) {
      if (
        new Date(`${year}-${month + 1}-${date}`).getTime() ===
        new Date(
          `${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`
        ).getTime()
      ) {
        // console.log("On the maximum date, hours and minutes reduced");
        setHoursRange({ start: 0, end: max.getHours() + 1 });
        setMinuteRange({ start: 0, end: max.getMinutes() });
      } else {
        // console.log("Not on the maximum date, hours and minutes reset");
        setHoursRange({ start: 0, end: 24 });
        setMinuteRange({ start: 0, end: 60 });
      }
    } else if (!min && !max) {
      setHoursRange({ start: 0, end: 24 });
      setMinuteRange({ start: 0, end: 60 });
    }
  };

  const onTimeClickHour = (hours: number) => {
    setMenuDisplayDate((prevState) => ({ ...prevState, hours }));
    if (min) {
      if (
        new Date(
          `${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${
            menuDisplayDate.date
          }`
        ).getTime() ===
        new Date(
          `${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`
        ).getTime()
      ) {
        if (min.getHours() === hours) {
          setMinuteRange({ start: min.getMinutes(), end: 60 });
        } else {
          setMinuteRange({ start: 0, end: 60 });
        }
      }
    }
    if (max) {
      if (
        new Date(
          `${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${
            menuDisplayDate.date
          }`
        ).getTime() ===
        new Date(
          `${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`
        ).getTime()
      ) {
        if (max.getHours() === hours) {
          setMinuteRange({ start: 0, end: max.getMinutes() });
        } else {
          setMinuteRange({ start: 0, end: 60 });
        }
      }
    }
  };

  const onTimeClickMinute = (minutes: number) => {
    setMenuDisplayDate((prevState) => ({ ...prevState, minutes }));
  };

  const handleConfirm = () => {
    setSelectedDate(menuDisplayDate);
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
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showDisplayTime = () => {
    if (selectedDate) {
      if (time === "false") {
        return `${selectedDate.year}/${String(selectedDate.month + 1).padStart(
          2,
          "0"
        )}/${String(selectedDate.date).padStart(2, "0")}`;
      }
      return `${selectedDate.year}/${String(selectedDate.month + 1).padStart(
        2,
        "0"
      )}/${String(selectedDate.date).padStart(2, "0")} ${String(
        selectedDate.hours
      ).padStart(2, "0")}:${String(selectedDate.minutes).padStart(2, "0")}`;
    }
    return "";
  };

  return (
    <div className="datepicker" style={{ width: width }}>
      <input
        style={{
          backgroundColor: disabled ? "#FAFAFA" : "#fff",
          cursor: disabled ? "default" : "pointer",
        }}
        ref={inputRef}
        type="text"
        className="datepicker_input"
        value={showDisplayTime()}
        placeholder="Select a date"
        readOnly
      />

      {open ? (
        <div className="datepicker_modal" ref={menuRef}>
          <Header
            menuDisplayDate={menuDisplayDate}
            handleCancel={handleCancel}
            setMenuDisplayDate={setMenuDisplayDate}
          />
          <Calendar
            onDateClick={onDateClick}
            menuDisplayDate={menuDisplayDate}
            currentDateObj={current}
            min={min}
            max={max}
          />
          {/* time === "true" || time === "optional" */}
          {time === "false" ? null : (
            <Time
              onTimeClickHour={onTimeClickHour}
              onTimeClickMinute={onTimeClickMinute}
              selected={menuDisplayDate}
              hoursRange={hoursRange}
              minutesRange={minutesRange}
              time={time}
            />
          )}
          <Footer
            handleConfirm={handleConfirm}
            menuDisplayDate={menuDisplayDate}
            time={time}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Datepicker;
