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
}) => {
  const current = {
    date: new Date().getFullYear(),
    month: new Date().getMonth(),
    year: new Date().getDate(),
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
  const [minutesRange, setMinuteRange] = useState<{ start: number; end: number }>({
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

    // const handleClickOutside = (event: Event) => {
    //   if (inputRef.current && inputRef.current.contains(event.target as Node)) {
    //     setOpen(!open);
    //   }
    //   if (open && menuRef.current && !menuRef.current.contains(event.target as Node)) {
    //     setOpen(false);
    //   }
    // };

    inputElement && inputElement.addEventListener("keydown", handleSpacebar);
    // document.addEventListener("mousedown", handleClickOutside);

    return () => {
      inputElement && inputElement.removeEventListener("keydown", handleSpacebar);
      // document.removeEventListener("mousedown", handleClickOutside);
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

  // useEffect(() => {
  //   console.log(menuDisplayDate)
  //   if(min){
  //     if(menuDisplayDate?.date === new Date(new Date(min).getTime() + 86400000).getDate() ){
  //       setMenuDisplayDate((prevState)=>({...prevState, hours: new Date(new Date(min).getTime() + 86400000).getHours()}))
  //       // setMinutes(arrayFill(new Date(new Date(min).getTime() + 86400000).getMinutes(), 60))
  //       // setHours(arrayFill(new Date(new Date(min).getTime() + 86400000).getHours(), 24))
  //       // setMinutes(arrayFill(new Date(new Date(min).getTime() + 86400000).getMinutes(), 60))
  //     }else{
  //       setMenuDisplayDate((prevState)=>({...prevState, hours: new Date().getHours()}))
  //       // ()
  //       // setMinutes(arrayFill(0, 60))
  //     }
  //   }
  // }, [menuDisplayDate?.date, menuDisplayDate?.month, min, max])

  useEffect(() => {
    if (min) {
      if (
        menuDisplayDate.year === min.getFullYear() &&
        menuDisplayDate.month === min.getMonth() &&
        menuDisplayDate.date === min.getDate()
      ) {
        // console.log(
        //   new Date(`${menuDisplayDate.year}-${menuDisplayDate.month}-${menuDisplayDate.date}`)
        // );
      }
    }
  }, [menuDisplayDate.year, menuDisplayDate.month, menuDisplayDate.date, min, max]);

  const onDateClick = (
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    // console.log({
    //   date,
    //   month,
    //   year,
    //   hours,
    //   minutes,
    //   seconds,
    // });
    setMenuDisplayDate((prevState) => ({
      ...prevState,
      date,
      month,
      year,
      hours,
      minutes,
      seconds,
    }));
    // if (
    //   min &&
    //   new Date(`${year}-${month + 1}-${date}`).getTime() ===
    //     new Date(`${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`).getTime() &&
    //   max
    //   // &&
    //   // new Date(`${year}-${month + 1}-${date}`).getTime() ===
    //   //   new Date(`${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`).getTime()
    // ) {
    //   console.log("first");
    //   setHoursRange({ start: min.getHours(), end: max.getHours() });
    //   setMinuteRange({ start: min.getMinutes(), end: max.getMinutes() });
    // } else
    // if (
    //   min &&
    //   // !max &&
    //   new Date(`${year}-${month + 1}-${date}`).getTime() ===
    //     new Date(`${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`).getTime()
    // ) {
    //   setHoursRange({ start: min.getHours(), end: 23 });
    //   setMinuteRange({ start: min.getMinutes(), end: 60 });
    // } else if (
    //   !min &&
    //   max
    //   // &&
    //   // new Date(`${year}-${month + 1}-${date}`).getTime() ===
    //   //   new Date(`${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`).getTime()
    // ) {
    //   setHoursRange({ start: 0, end: max.getHours() });
    //   setMinuteRange({ start: 0, end: max.getMinutes() });
    // } else if (!min && !max) {
    //   setHoursRange({ start: 0, end: 24 });
    //   setMinuteRange({ start: 0, end: 60 });
    // }
    // if (
    //   min &&
    //   new Date(`${year}-${month + 1}-${date}`).getTime() ===
    //     new Date(`${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`).getTime()
    // ) {
    //   // console.log("ok");
    // }
  };

  const onTimeClickHour = (hours: number) => {
    setMenuDisplayDate((prevState) => ({ ...prevState, hours }));
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
          <Time
            onTimeClickHour={onTimeClickHour}
            onTimeClickMinute={onTimeClickMinute}
            selected={menuDisplayDate}
            hoursRange={hoursRange}
            minutesRange={minutesRange}
          />
          <Footer handleConfirm={handleConfirm} menuDisplayDate={menuDisplayDate} />
        </div>
      ) : null}
    </div>
  );
};

export default Datepicker;
