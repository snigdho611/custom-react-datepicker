import React, { MutableRefObject, useRef, useState } from "react";
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
  currentDateObj: MutableRefObject<IDate>;
  onDateClick: (date: number, month: number, year: number) => void;
}

const DatepickerHeader: React.FC<IDatepickerHeaderProps> = ({ dateObj, onNext, onPrev }) => {
  return (
    <div className="datepicker_header">
      <div onClick={onPrev}>{"<"}</div>
      <div>
        {dayjs().locale("en").month(dateObj.month).format("MMMM")} {dateObj.year}
      </div>
      <div onClick={onNext}>{">"}</div>
    </div>
  );
};

const DatepickerBody: React.FC<IDatepickerBodyProps> = ({
  dateObj,
  currentDateObj,
  onDateClick,
}) => {
  const daysInMonth = new Date(dateObj.year, dateObj.month, 0).getDate();
  const startDay = new Date(dateObj.year, dateObj.month, 0).getDay();

  const getStartEmptyCells = () => {
    const emptyCells = [];
    for (let i = 0; i < startDay; i++) {
      emptyCells.push(<div key={i} className="datepicker_calendar_date_day-empty" />);
    }
    return emptyCells;
  };

  const getDateCells = () => {
    const dateCells = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // const isSelectedDate = i === new Date().getDate();
      let dayClass: string = "";
      dayClass = "datepicker_calendar_date_day";
      if (
        currentDateObj.current.date === i &&
        currentDateObj.current.month === dateObj.month &&
        currentDateObj.current.year === dateObj.year
      ) {
        dayClass = dayClass + " current-day";
      }

      if (dateObj.date === i) {
        dayClass = dayClass + " selected-day";
      }
      dateCells.push(
        <div
          key={i}
          onClick={() => {
            // console.log(dateObj);
            onDateClick(i, dateObj.month, dateObj.year);
          }}
          className={dayClass}
        >
          {i}
        </div>
      );
    }
    return dateCells;
  };

  // const getEndEmptyCells = () => {
  //   const emptyCells = [];
  //   for (let i = 0; i < (getStartEmptyCells().length + getDateCells().length) % 7; i++) {
  //     emptyCells.push(<div className="datepicker_calendar_date_day-empty" />);
  //   }
  //   return emptyCells;
  // };

  // console.log(dateObj);

  return (
    <div className="datepicker_calendar">
      <div className="datepicker_calendar_week">
        <div className="datepicker_calendar_week_day">MON</div>
        <div className="datepicker_calendar_week_day">TUE</div>
        <div className="datepicker_calendar_week_day">WED</div>
        <div className="datepicker_calendar_week_day">THU</div>
        <div className="datepicker_calendar_week_day">FRI</div>
        <div className="datepicker_calendar_week_day">SAT</div>
        <div className="datepicker_calendar_week_day">SUN</div>
      </div>
      <hr style={{ width: "70%" }} />
      <div className="datepicker_calendar_date">
        {getStartEmptyCells()}
        {getDateCells()}
        {/* {getEndEmptyCells()} */}
      </div>
      {/* <div className="calendar-grid">{calendarDays}</div> */}
    </div>
  );
};

const Datepicker = () => {
  const [dateObj, setDateObj] = useState<IDate>({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const currentDateObj = useRef<IDate>({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  // const;

  const onNext = () => {
    if (dateObj.month === 12) {
      console.log("Go to next year");
      return setDateObj({
        date: 1,
        month: 1,
        year: dateObj.year + 1,
      });
    }

    return setDateObj((prevState) => ({
      ...prevState,
      month: dateObj.month + 1,
    }));
  };

  const onPrev = () => {
    if (dateObj.month === 1) {
      console.log("Go to previous year");
      return setDateObj({
        date: 1,
        month: 12,
        year: dateObj.year - 1,
      });
    }

    return setDateObj((prevState) => ({
      ...prevState,
      month: dateObj.month - 1,
    }));
  };

  const onDateClick = (date: number, month: number, year: number) => {
    setDateObj({ date: date, month: month, year: year });
    console.log(dateObj);
  };

  return (
    <div className="datepicker">
      <DatepickerHeader dateObj={dateObj} onNext={onNext} onPrev={onPrev} />
      <DatepickerBody onDateClick={onDateClick} dateObj={dateObj} currentDateObj={currentDateObj} />
    </div>
  );
};

export default Datepicker;
